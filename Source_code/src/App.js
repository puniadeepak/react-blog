import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import AboutPage from './pages/AboutPage';
import './App.css';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <div id="page-body">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/about" component={AboutPage} />
          <Route path="/articles-list" component={ArticleListPage} />
          <Route path="/article/:name" component={ArticlePage} />
          <Route  component={NotFoundPage} />
      </Switch>
    </div>
    </div>
    </Router>
  );
}

export default App;
