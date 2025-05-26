const Spinner = ({ hightAndWidth }) => (
  <div className="flex items-center justify-center z-50">
    <div
      className={`animate-spin rounded-full border-t-4 border-pink-500  ${hightAndWidth}`}
    ></div>
  </div>
);

export default Spinner;
