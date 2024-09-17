import React, { useState } from 'react';
import './ImageWithComments.css';
import dogsImage from '../assets/dogs.jpg';
import user1Image from '../assets/user1.jpg';
import user2Image from '../assets/user2.jpg';
import user3Image from '../assets/user3.jpg';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

// User data for comments
const users = [
  { image: user1Image, name: 'Diana' },
  { image: user2Image, name: 'Jacob' },
  { image: user3Image, name: 'Nicky' },
];

const ImageWithComments = () => {
  // State variables
  const [comments, setComments] = useState([]); // List of comments
  const [showCommentBox, setShowCommentBox] = useState(false); // Toggle visibility of comment box
  const [currentCommentPos, setCurrentCommentPos] = useState({ x: 0, y: 0 }); // Position of the comment box
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Index to switch users

  // Add a new comment to the list
  const addComment = (commentData) => {
    setComments(prevComments => [
      ...prevComments,
      {
        ...commentData,
        id: prevComments.length, // Unique ID for each comment
        user: users[currentUserIndex], // Current user
        position: currentCommentPos, // Position of the comment
      },
    ]);
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length); // Switch user
    setShowCommentBox(false); // Hide the comment box
  };

  // Handle image click to position the comment box
  const handleImageClick = (event) => {
    const imageRect = event.target.getBoundingClientRect();
    const x = event.clientX - imageRect.left; // Calculate x position
    const y = event.clientY - imageRect.top; // Calculate y position
    setCurrentCommentPos({ x, y });
    setShowCommentBox(true); // Show the comment box
  };

  return (
    <div className="image-with-comments-container">
      <div className="image-container" onClick={handleImageClick}>
        <img src={dogsImage} alt="Dogs" className="image" />
        {comments.map((comment) => (
          <img
            key={comment.id}
            src={comment.user.image}
            alt={comment.user.name}
            className="comment-icon"
            style={{
              top: `${comment.position.y}px`,
              left: `${comment.position.x}px`,
              position: 'absolute',
              transform: 'translate(-50%, -100%)', // Center the pin
            }}
          />
        ))}
        {showCommentBox && (
          <CommentBox
            position={currentCommentPos}
            onAddComment={addComment}
            onCancel={() => setShowCommentBox(false)} // Close the comment box
          />
        )}
      </div>
      <div className="comment-section">
        <CommentList comments={comments} /> {/* Display the list of comments */}
      </div>
    </div>
  );
};

export default ImageWithComments;