import React from "react";
import classes from "./Article.module.css";

const Article = ({ title, url }) => {
  return (
    <div className={classes.article}>
      <h5 className={classes.title}>{title}</h5>
      <a href={url} rel="noopener noreferrer" target="_blank" className={classes.url}>
        {url}
      </a>
    </div>
  );
};

export default Article;
