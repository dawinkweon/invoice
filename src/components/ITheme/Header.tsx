import React from "react";

const classes = {
  title: "text-xl mb-1 font-semibold w-full",
};

export default function Header(props) {
  return (
    <h2 {...props} className={`${classes.title} ${props.className}`}>
      {props.children}
    </h2>
  );
}
