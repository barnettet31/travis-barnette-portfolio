/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { classNames } from "../../utils/classNames";
import Link from "next/link";
export interface INavigation {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
export interface IDashNavigationProps
{
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  navigation: INavigation[];
}

export const MobileDashboardNav = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
}: IDashNavigationProps) => {
  const { pathname } = useRouter();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-zinc-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-red-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Image
                    className="h-8 w-auto filter-red"
                    src="/images/logo.svg"
                    alt="TravCodez"
                    width={32}
                    height={32}
                  />
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          pathname === item.href
                            ? "text-zinc-300"
                            : "text-zinc-400 group-hover:text-zinc-300",
                          "mr-4 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 bg-zinc-800 p-4">
                <Link
                  href="/"
                  className="group block flex-shrink-0"
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="inline-block h-10 w-10 rounded-full"
                        src="profile.webp"
                        alt="Travis Barnette"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4 group">
                      <p className="text-base font-medium text-white">
                        Travis Barnette
                      </p>
                      <p className="text-sm font-medium text-zinc-400 text-left group-hover:text-red-500">
                        Logout
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0"></div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
