export const Container = ({ children, className }: { children: React.ReactNode, className?:string; }) => {
  return <div className={`mx-auto max-w-2xl lg:max-w-5xl ${className ? className : ""}`}>{children}</div>;
};
