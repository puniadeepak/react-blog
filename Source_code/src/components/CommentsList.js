import React from 'react';

const CommentsList = ({comments}) => (
    <>
    <h3>Comments:</h3>
    {comments.map((comment, key) =>(
        <div className="comment" key={key}>
            <h4>{comment.Name}</h4>
            <p>{comment.Text}</p>
        </div>
    ))}
    </>
);
export default CommentsList;