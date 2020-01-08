import React from 'react';

const UpvoteSection =({articleName, Upvotes, setArticleInfo}) => {
    const upvoteArticle = async() => {
        const result = await fetch(`/api/articles/${articleName}/upvote`,{
            method: 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
    <div id="upvotes-section">
    <button onClick={() => upvoteArticle()}>Add Vote</button>
    <p>This article has {Upvotes} votes. </p>
    </div>
);
    }

export default UpvoteSection;