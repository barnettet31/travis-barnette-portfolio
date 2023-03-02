import clsx from "clsx";
import Link from "next/link";

interface SocialLinkProps {
    className?: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode;
}
export function SocialLink({ className, href, children, icon: Icon }: SocialLinkProps) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-red-500 dark:text-zinc-200 dark:hover:text-red-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-red-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}