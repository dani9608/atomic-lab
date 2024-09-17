// src/components/CommentBox.js
import React, { useState } from 'react';
import './CommentBox.css';

// FileUpload component for handling file inputs
const FileUpload = ({ id, label, accept, onChange }) => (
  <div className="file-upload">
    <label htmlFor={id} className="upload-label">{label}</label>
    <input
      id={id}
      type="file"
      accept={accept}
      onChange={onChange}
      className="upload-input"
    />
  </div>
);

const CommentBox = ({ position, onAddComment, onCancel }) => {
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [voiceNote, setVoiceNote] = useState(null);

  // Handle comment submission
  const handleSubmit = () => {
    if (text.trim() || attachment || voiceNote) {
      const commentData = { text, attachment, voiceNote, position };
      console.log('Submitting comment:', commentData);
      onAddComment(commentData);
      setText('');
      setAttachment(null);
      setVoiceNote(null);
      onCancel(); // Close the comment box after submission
    }
  };

  return (
    <div
      className="comment-box"
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}
    >
      <textarea
        placeholder="Type a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="comment-input"
      />
      <FileUpload
        id="imageUpload"
        label="Image"
        accept="image/*"
        onChange={(e) => setAttachment(e.target.files[0])}
      />
      <FileUpload
        id="voiceUpload"
        label="Voice Note"
        accept="audio/*"
        onChange={(e) => setVoiceNote(e.target.files[0])}
      />
      <div className="comment-box-actions">
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CommentBox;