/* eslint-disable @typescript-eslint/no-misused-promises */
import Link from "next/link";
import { Container } from "../container/container.component";
import { signIn } from "next-auth/react";
interface INavLink {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: INavLink) {
  return (
    <Link
      href={href}
      className="transition hover:text-red-500 dark:hover:text-red-400"
    >
      {children}
    </Link>
  );
}
export const PublicFooter = ()=>{
  const handleClick = async ()=>{
    await signIn('discord', { callbackUrl: '/dashboard' });
  }
    return (
      <footer className="pt-16">
        <Container>
          <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/myProjects">Projects</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <button onClick={handleClick} className="transition hover:text-red-500 dark:hover:text-red-400">Login</button>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Travis Barnette. All rights
                reserved.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    );
}