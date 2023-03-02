import Link, { type LinkProps} from "next/link";
import clsx from "clsx";
import { type ReactNode } from "react";

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

type BaseProps = {
  children: ReactNode,
  className?: string,
  variant: "primary" | "secondary",

}
type ButtonProps = BaseProps & 
Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>&{
  as: "button",
};

type LinkTypeProps = BaseProps & Omit<LinkProps, keyof BaseProps> & {
  as: "link",
}
type ButtonAsExternalLinkProps = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  as:"externalLink"
}
type ButtonTypeProps = ButtonProps | LinkTypeProps | ButtonAsExternalLinkProps;

export function Button(props: ButtonTypeProps) {
  let { className } = props;
  const { variant, as } = props;
  className = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    variantStyles[variant],
    className
  );
  if (as === "button") {
    const { className, children, ...otherProps } = props;
    return <button className={className} {...otherProps} >{children}</button>;
  } else if (as === "link") {
    const { className, children, href } = props;
    return <Link href={href} className={className} >{children}</Link>;
  }else if(as === "externalLink"){
    const { className, children, ...rest } = props;
    return <a className={className} {...rest} >{children}</a>
  }
  else{
       const { className } = props;
       return <button className={className} />;
  }
}
