export default function ATag({ children, ...props }) {
  return <a {...props}>{children}</a>;
}
