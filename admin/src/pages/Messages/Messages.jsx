// Messages.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import './Messages.css';
import axios from 'axios';
import { FaReply, FaArchive, FaTrash } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const joinUrl = (base = '', path = '') => {
  if (!base) return path;
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

const Messages = ({ url }) => {
  const API_PATH = '/api/messages';
  const mountedRef = useRef(true);
  const feedbackTimerRef = useRef(null);

  // UI state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const [view, setView] = useState('inbox');
  const [actionFeedback, setActionFeedback] = useState(null);

  // per-message action loading map { [id]: { togglingRead: bool, archiving: bool, deleting: bool } }
  const [actionLoadingMap, setActionLoadingMap] = useState({});

  // memoized service with stable baseURL
  const messageService = useMemo(() => {
    const base = url || '';
    const full = joinUrl(base, API_PATH);

    return {
      getMessages: async (signal) => {
        const response = await axios.get(full, { signal });
        return response.data;
      },
      updateMessageStatus: async (id, statusData, signal) => {
        const urlPatch = joinUrl(full, `${id}/status`);
        const response = await axios.patch(urlPatch, statusData, { signal, headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')||''}` } });
        return response.data;
      },
      deleteMessage: async (id, signal) => {
        const urlDel = joinUrl(full, `${id}`);
        const response = await axios.delete(urlDel, { signal, headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')||''}` } });
        return response.data;
      }
    };
  }, [url]);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setGlobalError(null);
        const data = await messageService.getMessages(controller.signal);
        if (!mountedRef.current) return;
        // Defensive check: data should be array
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          // request was cancelled
          return;
        }
        console.error('Failed to fetch messages:', err);
        if (!mountedRef.current) return;
        setGlobalError('Failed to fetch messages. Please try again later.');
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      mountedRef.current = false;
      controller.abort();
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
      }
    };
  }, [messageService]); 

  const setActionLoading = (id, partial) => {
    setActionLoadingMap(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...partial } }));
  };

  const clearActionLoading = (id, keys = null) => {
    setActionLoadingMap(prev => {
      const next = { ...(prev[id] ? prev : {}) };
      if (!prev[id]) return prev;
      if (!keys) {
        // remove whole entry
        const cloned = { ...prev };
        delete cloned[id];
        return cloned;
      } else {
        const newEntry = { ...prev[id] };
        keys.forEach(k => delete newEntry[k]);
        if (Object.keys(newEntry).length === 0) {
          const cloned = { ...prev };
          delete cloned[id];
          return cloned;
        }
        return { ...prev, [id]: newEntry };
      }
    });
  };

  const showFeedback = (msg) => {
    setActionFeedback(msg);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setActionFeedback(null);
      feedbackTimerRef.current = null;
    }, 3000);
  };

  const handleToggleRead = async (id, currentStatus) => {
    const controller = new AbortController();
    setActionLoading(id, { togglingRead: true });
    try {
      const updated = await messageService.updateMessageStatus(id, { isRead: !currentStatus }, controller.signal);
      // Expect the backend to return the updated message object
      setMessages(prev => prev.map(m => (m._id === id ? updated : m)));
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Failed to update message status', err);
        showFeedback('Failed to update read status. Try again.');
      }
    } finally {
      clearActionLoading(id, ['togglingRead']);
    }
  };

  const handleArchive = async (id, newArchivedValue) => {
    const controller = new AbortController();
    setActionLoading(id, { archiving: true });
    try {
      const updated = await messageService.updateMessageStatus(id, { isArchived: newArchivedValue }, controller.signal);
      setMessages(prev => prev.map(m => (m._id === id ? updated : m)));
      showFeedback(newArchivedValue ? 'Message archived successfully!' : 'Message unarchived successfully!');
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Failed to archive message', err);
        showFeedback('Failed to update archive status. Try again.');
      }
    } finally {
      clearActionLoading(id, ['archiving']);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;
    const controller = new AbortController();
    setActionLoading(id, { deleting: true });
    try {
      await messageService.deleteMessage(id, controller.signal);
      setMessages(prev => prev.filter(m => m._id !== id));
      showFeedback('Message deleted.');
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Failed to delete message', err);
        showFeedback('Failed to delete message. Try again.');
      }
    } finally {
      clearActionLoading(id, ['deleting']);
    }
  };

  const filteredMessages = useMemo(() => {
    return view === 'inbox'
      ? messages.filter(msg => !msg.isArchived)
      : messages.filter(msg => msg.isArchived);
  }, [messages, view]);

  return (
    <div className="admin-messages-container">
        <div className="admin-messages-inner">
      <header className="admin-messages-header">
        <h2>Manage Messages</h2>
        <div className="view-switcher" role="tablist" aria-label="Message views">
          <button onClick={() => setView('inbox')} className={view === 'inbox' ? 'active' : ''} aria-pressed={view === 'inbox'}>Inbox</button>
          <button onClick={() => setView('archived')} className={view === 'archived' ? 'active' : ''} aria-pressed={view === 'archived'}>Archived</button>
        </div>
      </header>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading messages...</p>
        </div>
      )}

      {globalError && <p className="error-message">{globalError}</p>}

      {actionFeedback && (
        <div className="feedback-message success" role="status">
          {actionFeedback}
        </div>
      )}

      {!loading && !globalError && (
        <div className="messages-list">
          {filteredMessages.length > 0 ? filteredMessages.map(msg => {
            // defensive defaults
            const id = msg._id || msg.id || '';
            const isRead = !!msg.isRead;
            const isArchived = !!msg.isArchived;
            const actionLoading = actionLoadingMap[id] || {};
            return (
              <div key={id || Math.random()} className={`message-item ${isRead ? 'read' : 'unread'}`}>
                <div className="message-details">
                  <div className="message-sender">
                    <strong>{msg.name || 'Unknown'}</strong> ({msg.email || 'no-email'})
                  </div>
                  <div className="message-subject">{msg.subject || '(no subject)'}</div>
                  <div className="message-body">{msg.message || ''}</div>
                  <div className="message-timestamp">
                    Received: {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'unknown'}
                  </div>
                </div>
                <div className="message-actions">
                  <a
                    href={`mailto:${msg.email || ''}?subject=Re: ${encodeURIComponent(msg.subject || '')}`}
                    className="action-btn reply"
                    onClick={(e) => {
                      if (!msg.email) {
                        e.preventDefault();
                        showFeedback('No email address provided.');
                      }
                    }}
                  >
                    <FaReply /> Reply
                  </a>

                  <button
                    className="action-btn mark-read"
                    onClick={() => handleToggleRead(id, isRead)}
                    disabled={actionLoading.togglingRead}
                    aria-pressed={isRead}
                  >
                    {actionLoading.togglingRead ? <Spinner animation="border" size="sm" /> : (isRead ? 'Mark as Unread' : 'Mark as Read')}
                  </button>

                  <button
                    className="action-btn archive"
                    onClick={() => handleArchive(id, !isArchived)}
                    disabled={actionLoading.archiving}
                  >
                    {actionLoading.archiving ? <Spinner animation="border" size="sm" /> : (isArchived ? 'Unarchive' : 'Archive')} <FaArchive />
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(id)}
                    disabled={actionLoading.deleting}
                  >
                    {actionLoading.deleting ? <Spinner animation="border" size="sm" /> : (<><FaTrash /> Delete</>)}
                  </button>
                </div>
              </div>
            );
          }) : (
            <p>No messages in this view.</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

Messages.propTypes = {
  url: PropTypes.string // base URL for API (optional)
};

Messages.defaultProps = {
  url: '' // if empty, API path will be used as-is (relative)
};

export default Messages;
