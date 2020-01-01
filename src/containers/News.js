import React, { useEffect, useMemo } from "react";
import Article from "../components/Article/Article";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import withError from "../hoc/withError";
import classes from "./News.module.css";
import Spinner from "../components/Spinner/Spinner";

function News({ articles, loading, error, fetchNews }) {
  let newsContent = null;

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const articlesCount = useMemo(() => {
    if (articles) {
      return articles.length;
    } else {
      return 0;
    }
  }, [articles]);

  if (loading) {
    newsContent = <Spinner />;
  } else if (articles && articles.length > 0 && !error) {
    const news = articles.map(artObj => {
      return <Article key={artObj.id} {...artObj} />;
    });

    newsContent = (
      <>
        {news}
        <div>
          Articles: <span className={classes.Count}>{articlesCount}</span>
        </div>
      </>
    );
  }
  return (
    <div className="container">
      <h2>News</h2>
      {newsContent}
    </div>
  );
}

const mapStateToProps = state => ({
  articles: state.news.data,
  loading: state.news.loading,
  error: state.news.error
});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(actions.fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(withError(News));
