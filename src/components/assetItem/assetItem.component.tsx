import { type Blog, type Project } from "@prisma/client";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { MetaDialog } from "../metaDialog/metaDialog.component";
import { formatDate } from "~/utils/formatDate";
import { classNames } from "~/utils/classNames";

export function AssetItem({
  asset,
  index,
  handleDelete,
  handleUpdate,
}: {
  asset: Project | Blog;
  index: number;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, title: string, description: string) => void;
}) {
  const [editMeta, setEditMeta] = useState(false);
  const showEditMeta = () => setEditMeta(true);
  const { pathname } = useRouter();
  const returnLink = (path: string, id: string) => {
    if (path === `/dashboard/projects`) {
      return `projects/edit/${id}`;
    }
    if (path === `/dashboard/blogs`) {
      return `blogs/edit/${id}`;
    }
    return "";
  };
  const updateHandler = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    handleUpdate(asset.id, title, description);
  };
  return (
    <li className="col-span-1 flex rounded-md shadow-sm">
      <div
        className={classNames(
          "bg-red-500",
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
        )}
      >
        {index}
      </div>
      <div className="flex flex-1 items-center justify-between rounded-r-md border-t border-r border-b border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-700">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <Link
            href={returnLink(pathname, asset.id)}
            className="font-medium text-gray-900 hover:text-gray-600 dark:text-white"
          >
            {asset.title}
          </Link>
          <p className="text-gray-500 dark:text-gray-200">
            {formatDate(asset.createdAt)}{" "}
          </p>
        </div>
        <Menu as="div" className="relative pr-2">
          <Menu.Button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-600"
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={returnLink(pathname, asset.id)}
                      className={`${
                        active
                          ? "bg-red-500 text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <PencilIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <PencilSquareIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Edit
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => showEditMeta()}
                      className={`${
                        active
                          ? "bg-red-500 text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <PencilSquareIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <PencilSquareIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Update Meta Data
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className={`${
                        active
                          ? "bg-red-500 text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <TrashIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <TrashIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <MetaDialog
        submitHandler={updateHandler}
        editMeta={editMeta}
        setIsEditMeta={setEditMeta}
        asset={asset}
      />
    </li>
  );
}
