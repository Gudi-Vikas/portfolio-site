import React, { useState } from 'react'
import './EditForm.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const EditForm = ({ edit, setEdit, url, idOfEdit, setIdOfEdit, data, setData, onChangeHandler, onUpdateSuccess }) => {
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCancelHandler = () => {
    const ok = window.confirm("Are you sure you want to cancel? All changes will be lost.");
    if (!ok) return;
    
    setEdit(false);
    setIdOfEdit(null);
    setData(null);
    setNewImage(null);
    setImagePreview(null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      const technologyArr = data.technologies
        ? data.technologies.split(",").map(s => s.trim().replace(/\s+/g, " ")).filter(Boolean)
        : [];
        
      const formData = new FormData();
      formData.append("id", idOfEdit);
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("technologies", JSON.stringify(technologyArr));
      formData.append("started", data.started.trim());
      formData.append("completed", data.completed.trim());
      formData.append("repo", data.repo.trim());
      formData.append("demo", data.demo.trim());
      
      // Only append new image if one is selected
      if (newImage) {
        formData.append("image", newImage);
      }

      const resp = await axios.put(`${url}/api/projects/edit`, formData);
      
      if (resp.data.success) {
        toast.success("Project updated successfully! 🎉");
        setEdit(false);
        setIdOfEdit(null);
        setData(null);
        setNewImage(null);
        setImagePreview(null);
        
        // Call the callback to refresh the projects list
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      } else {
        toast.error(resp.data.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Update error:", err);
      const errorMessage = err.response?.data?.message || "Network error. Please check your connection.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current image URL for display
  const getCurrentImageUrl = () => {
    if (imagePreview) return imagePreview;
    if (data.image && !(data.image instanceof File)) {
      return url + data.image;
    }
    return assets.upload_area;
  };

  // Clean up image preview when component unmounts
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className='edit-form-overlay'>
      <div className="edit-form-modal">
        <div className="edit-form-header">
          <h2>✏️ Edit Project</h2>
          <button 
            className="close-btn" 
            onClick={onCancelHandler}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form className="edit-form" onSubmit={onSubmitHandler}>
          {/* Title Field */}
          <div className="form-field">
            <label htmlFor="edit-title">Project Title *</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              placeholder="Enter project title"
              required
              maxLength={100}
            />
          </div>

          {/* Image Field - Full Width */}
          <div className="form-field">
            <label>Project Image</label>
            <div className="image-upload-container">
              <label htmlFor="edit-image" className="image-upload-label">
                <img
                  className="image-preview"
                  src={getCurrentImageUrl()}
                  alt="Project preview"
                />
                <div className="image-overlay">
                  <span>📷 Click to change</span>
                </div>
              </label>
              <input
                type="file"
                id="edit-image"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
            </div>
            <div className="image-info">
              {data.image && !(data.image instanceof File) && (
                <span className="current-image">Current: {data.image.split('/').pop()}</span>
              )}
              {newImage && (
                <span className="new-image">New: {newImage.name}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-field">
            <label htmlFor="edit-description">Description *</label>
            <textarea
              id="edit-description"
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Describe your project..."
              rows={4}
              required
              maxLength={500}
            />
            <small className="char-count">{data.description.length}/500</small>
          </div>

          {/* Technologies */}
          <div className="form-field">
            <label htmlFor="edit-technologies">Technologies</label>
            <input
              id="edit-technologies"
              type="text"
              name="technologies"
              value={data.technologies}
              onChange={onChangeHandler}
              placeholder="React, Node.js, MongoDB (comma separated)"
            />
          </div>

          {/* Date Fields */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="edit-started">Started Date *</label>
              <input
                id="edit-started"
                type="text"
                name="started"
                value={data.started}
                onChange={onChangeHandler}
                placeholder="DD/MM/YY"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="edit-completed">Completed Date</label>
              <input
                id="edit-completed"
                type="text"
                name="completed"
                value={data.completed}
                onChange={onChangeHandler}
                placeholder="DD/MM/YY (optional)"
              />
            </div>
          </div>

          {/* Links */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="edit-repo">Repository Link</label>
              <input
                id="edit-repo"
                type="url"
                name="repo"
                value={data.repo}
                onChange={onChangeHandler}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div className="form-field">
              <label htmlFor="edit-demo">Demo Link</label>
              <input
                id="edit-demo"
                type="url"
                name="demo"
                value={data.demo}
                onChange={onChangeHandler}
                placeholder="https://your-demo.com (optional)"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="update-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? '🔄 Updating...' : '💾 Update Project'}
            </button>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onCancelHandler}
              disabled={isSubmitting}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditForm
