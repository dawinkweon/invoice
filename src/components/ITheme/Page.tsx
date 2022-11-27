import React from "react";

const classes = {
  page: "bg-gray-50 w-screen h-screen p-8",
};

type Props = {
  children: any;
  className?: String;
}

export default function Page({ children, className }: Props) {
  return <div className={`${classes.page} ${className}`}>{children}</div>;
}
