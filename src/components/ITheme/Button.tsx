import React from "react";

const classes = {
  addButton: "rounded self-end w-36 text-xs uppercase px-2 py-2",
};
const Button = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`${classes.addButton} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
