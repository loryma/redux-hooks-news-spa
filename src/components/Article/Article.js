import React from "react";

const Article = ({ title, text }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Article;
