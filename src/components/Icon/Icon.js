import React from "react";
import classes from "./Icon.module.css";

const Icon = ({ label, link }) => {
  const classList = [classes.Icon, classes[label]];
  return <a href={link} className={classList.join(" ")}></a>;
};

export default Icon;
