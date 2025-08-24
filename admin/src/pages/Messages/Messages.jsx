import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import './Messages.css';
import axios from 'axios';

const Messages = ({ url }) => {
    const API_URL = '/api/messages';

    // Centralized service
    const messageService = {
        getMessages: async (token) => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(url + API_URL, config);
            return response.data;
        },
        updateMessageStatus: async (id, statusData, token) => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.patch(`${url + API_URL}/${id}/status`, statusData, config);
            return response.data;
        },
        deleteMessage: async (id, token) => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.delete(`${url + API_URL}/${id}`, config);
            return response.data;
        }
    };

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('inbox');

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const data = await messageService.getMessages(userInfo.token);
                setMessages(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch messages. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo?.token) {
            fetchMessages();
        }
    }, [userInfo]);

    const handleToggleRead = async (id, currentStatus) => {
        try {
            const updatedMessage = await messageService.updateMessageStatus(id, { isRead: !currentStatus }, userInfo.token);
            setMessages(messages.map(msg => msg._id === id ? updatedMessage : msg));
        } catch (err) {
            console.error('Failed to update message status', err);
        }
    };

    const handleArchive = async (id, isArchived) => {
        try {
            const updatedMessage = await messageService.updateMessageStatus(id, { isArchived }, userInfo.token);
            setMessages(messages.map(msg => msg._id === id ? updatedMessage : msg));
        } catch (err) {
            console.error('Failed to archive message', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this message?')) {
            try {
                await messageService.deleteMessage(id, userInfo.token);
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (err) {
                console.error('Failed to delete message', err);
            }
        }
    };

    const filteredMessages = useMemo(() => {
        return view === 'inbox'
            ? messages.filter(msg => !msg.isArchived)
            : messages.filter(msg => msg.isArchived);
    }, [messages, view]);

    return (
        <div className="admin-messages-container">
            <header className="admin-messages-header">
                <h2>Manage Messages</h2>
                <div className="view-switcher">
                    <button onClick={() => setView('inbox')} className={view === 'inbox' ? 'active' : ''}>Inbox</button>
                    <button onClick={() => setView('archived')} className={view === 'archived' ? 'active' : ''}>Archived</button>
                </div>
            </header>

            {loading && <p>Loading messages...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
                <div className="messages-list">
                    {filteredMessages.length > 0 ? filteredMessages.map(msg => (
                        <div key={msg._id} className={`message-item ${msg.isRead ? 'read' : 'unread'}`}>
                            <div className="message-details">
                                <div className="message-sender">
                                    <strong>{msg.name}</strong> ({msg.email})
                                </div>
                                <div className="message-subject">{msg.subject}</div>
                                <div className="message-body">{msg.message}</div>
                                <div className="message-timestamp">
                                    Received: {new Date(msg.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="message-actions">
                                <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`} className="action-btn reply">Reply</a>
                                <button onClick={() => handleToggleRead(msg._id, msg.isRead)} className="action-btn mark-read">
                                    {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                                </button>
                                <button onClick={() => handleArchive(msg._id, !msg.isArchived)} className="action-btn archive">
                                    {msg.isArchived ? 'Unarchive' : 'Archive'}
                                </button>
                                <button onClick={() => handleDelete(msg._id)} className="action-btn delete">Delete</button>
                            </div>
                        </div>
                    )) : (
                        <p>No messages in this view.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
