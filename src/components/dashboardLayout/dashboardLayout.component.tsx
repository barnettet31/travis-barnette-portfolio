/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {  type ReactElement, useState } from "react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { type ILayoutProps } from "../publicLayout/publicLayout.component";
import { MobileDashboardNav } from "../mobileDashboardNav/mobileDashboardNav.component";
import { LargeDashboardNav } from "../largeDashboardNav/largeDashboardNav.component";
import DarkModeToggle from "../darkModeToggle/darkmodeToggle.component";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderIcon,
    current: false,
  },
  { name: "Blogs", href: "/dashboard/blogs", icon: InboxIcon, current: false },
];



function DashboardLayout({ children }: ILayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <>
      <div>
        <MobileDashboardNav
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          navigation={navigation}
        />

        <LargeDashboardNav navigation={navigation} />
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-zinc-700 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden flex items-center justify-between px-3">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
            <DarkModeToggle/>
          </div>
          <main className="flex-1 bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            <div className="py-6">
              
              <div className="w-full h-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export const getDashboardLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
