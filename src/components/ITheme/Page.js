const classes = {
  page: "bg-gray-50 w-screen h-screen p-8",
};

export default function Page({ children }) {
  return <div className={classes.page}>{children}</div>;
}
