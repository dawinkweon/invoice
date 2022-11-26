const classes = {
  page: "bg-gray-50 w-screen h-screen p-8",
};

export default function Page({ children, className }) {
  return <div className={`${classes.page} ${className}`}>{children}</div>;
}
