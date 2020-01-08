import React, {useState, useEffect} from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticleList';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvoteSection from '../components/UpvoteSection';
import AddCommentForm from '../components/AddCommentForm';
const ArticlePage = ({match}) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name=== name);

    //using react hooks
    const [articleInfo, setArticleInfo] = useState({Upvotes: 0, Comments: [] });
    
    useEffect(() =>{
        const fetchData = async() => {
            const result = await fetch(`http://localhost:5000/api/articles/${name}`)
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    },[name]);

    if(!article) return <NotFoundPage />
    
    const otherArticles = articleContent.filter(article => article.name !== name);


    return (
    <React.Fragment>
<h1>{article.name}</h1>
<UpvoteSection articleName={name} Upvotes={articleInfo.Upvotes} setArticleInfo={setArticleInfo} />
{article.content.map((paragraph, key)=>(
<p key={key}>{paragraph}</p>
))}
<CommentsList comments={articleInfo.Comments} />
<AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
<h3> Other Articles:</h3>
 <ArticlesList articles={otherArticles}/>
    </React.Fragment>
 
);
}

export default ArticlePage;
