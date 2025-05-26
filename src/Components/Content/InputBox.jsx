export default function InputBox({ lable, children, lableStyle, htmlFor }) {
  return (
    <div>
      <label className={lableStyle} htmlFor={htmlFor}>
        {lable}
      </label>
      {children}
    </div>
  );
}
