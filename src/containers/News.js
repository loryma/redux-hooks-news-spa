import React, { useEffect, useMemo } from "react";
import Article from "../components/Article/Article";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import withError from "../hoc/withError";
import classes from "./News.module.css";
import Spinner from "../components/Spinner/Spinner";

function News({ posts, loading, error, fetchNews }) {
  let newsContent = null;

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const postsCount = useMemo(() => {
    if (posts) {
      return posts.length;
    } else {
      return 0;
    }
  }, [posts]);

  if (loading) {
    newsContent = <Spinner />;
  } else if (posts && posts.length > 0 && !error) {
    const news = posts.map((post, i) => {
      return <Article key={i} {...post} />;
    });

    newsContent = (
      <>
        {news}
        <div>
          <span className={classes.Count}>{postsCount}</span>
        </div>
      </>
    );
  }
  return (
    <div className="container">
      <h2 className={classes.header}>News</h2>
      {newsContent}
    </div>
  );
}

const mapStateToProps = state => ({
  posts: state.news.data,
  loading: state.news.loading,
  error: state.news.error
});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(actions.fetchSubreddit("science"))
});

export default connect(mapStateToProps, mapDispatchToProps)(withError(News));
