const classes = {
  addButton:
    "rounded bg-blue-700 self-end w-36 h-8 sm:h-10 text-white text-xs uppercase",
};
const OkButton = (props) => {
  return (
    <button {...props} className={`${classes.addButton} ${props.className}`}>
      {props.children}
    </button>
  );
};

export default OkButton;
