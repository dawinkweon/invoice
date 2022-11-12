const classes = {
  title: "text-xl mb-1 font-semibold w-full",
};

export default function Header({ children, className }) {
  return <h2 className={`${classes.title} ${className}`}>{children}</h2>;
}
