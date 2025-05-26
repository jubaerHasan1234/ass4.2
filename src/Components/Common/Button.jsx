export default function Button({ buttonStyle, children, ...props }) {
  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
}
