const Button = (props) => {
  return (
    <button
      type={props.type}
      className={props.classNameProps}
      onClick={props.onClick}
      style={{ margin: "1rem 2rem" }}
    >
      {props.children}
    </button>
  );
};

export default Button;
