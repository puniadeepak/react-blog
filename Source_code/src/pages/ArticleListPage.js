import React from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticleList';

const ArticleListPage = () => (
    <React.Fragment>
<h1> Articles List</h1>
<ArticlesList articles={articleContent} />
    </React.Fragment>
 
);

export default ArticleListPage;
