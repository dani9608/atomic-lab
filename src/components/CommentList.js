// src/components/CommentList.js
import React from 'react';
import './CommentList.css';

// Component to display a list of comments
const CommentList = ({ comments }) => (
  <div className="comment-list-container">
    <h2>Comments</h2>
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <img
            src={comment.user.image}
            alt={comment.user.name}
            className="comment-user-img"
          />
          <div className="comment-details">
            <span className="comment-user-name">{comment.user.name}</span>
            <p>{comment.text}</p>
            {comment.attachment && (
              <img
                src={URL.createObjectURL(comment.attachment)}
                alt="Attached"
                className="comment-attachment"
              />
            )}
            {comment.voiceNote && (
              <audio controls>
                <source src={URL.createObjectURL(comment.voiceNote)} />
              </audio>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CommentList;