/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { classNames } from "../../utils/classNames";
import { type INavigation } from "../mobileDashboardNav/mobileDashboardNav.component";
import Image from "next/image";
import Link from "next/link";
export const LargeDashboardNav = ({
  navigation,
}: {navigation:INavigation[]}) => {
    const { pathname } = useRouter();
    
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col bg-zinc-800">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Image
              className="h-8 w-auto"
              src="/logo.svg"
              alt="TravCodez"
              width={32}
              height={32}
            />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    pathname === item.href
                      ? "text-zinc-300"
                      : "text-zinc-400 group-hover:text-zinc-300",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 bg-zinc-700 p-4">
          <Link
            href="/"
            className="group block w-full flex-shrink-0"
          >
            <div className="flex items-center">
              <div>
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src="/profile.webp"
                  alt=""
                  width={36}
                  height={36}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Travis Barnete</p>
                <p className="text-xs font-medium text-zinc-300 group-hover:text-zinc-200">
                  Logout
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};