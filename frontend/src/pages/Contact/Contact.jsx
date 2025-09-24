import React, { useState } from 'react'
import './Contact.css'
import { socialMediaLogo } from '../../assets/assets'

const Contact = ({url}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${url}/api/messages/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFeedbackVisible(true);
        setTimeout(() => setFeedbackVisible(false), 1000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' });
        setFeedbackVisible(true);
        setTimeout(() => setFeedbackVisible(false), 1000);
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        {/* Left Panel - Contact Information */}
        <div className="contact-left">
          <h2 className="contact-info-title">Contact Information</h2>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                </svg>
              </div>
              <div className="contact-text">
                <span className="contact-label">Location</span>
                <span className="contact-value">Kukatpally, Hyderabad</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white"/>
                </svg>
              </div>
              <div className="contact-text">
                <span className="contact-label">Email</span>
                <span className="contact-value">vikasgudii@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="connect-section">
            <h3 className="connect-title">Connect with me</h3>
            <div className="social-buttons">
              <button className="social-btn">
                <a href="mailto:vikasgudii@gmail.com" target='_blank'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="white"/>
                </svg>
                </a>
              </button>
              <button className="social-btn">
                <a href="https://www.linkedin.com/in/vikas-gudi" target='_blank'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="white"/>
                  
                </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Contact Form */}
        <div className="contact-right">
          <h2 className="form-title">Send me a message</h2>
          
          {feedbackVisible && submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Tell me about your project or inquiry..."
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required 
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="send-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
