import { type ReactElement } from "react";
import { PublicNavBar } from "../publicNavBar/publicNavBar.component";
import { PublicFooter } from "../publicFooter/publicFooter.component";

export interface ILayoutProps {
  children: ReactElement;
}

function PublicLayout({ children }: ILayoutProps) {
  return (
    <div className="dark:bg-zinc-900 bg-zinc-50 text-zinc-800 dark:text-zinc-100 transition ease-in-out h-full flex flex-col justify-between">
      <PublicNavBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      <PublicFooter />
    </div>
  );
}

export const getPublicLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
);
