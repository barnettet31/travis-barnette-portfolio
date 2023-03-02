/* eslint-disable react/no-unescaped-entities */
import { Transition } from "@headlessui/react";
import { type Blog, type Project } from "@prisma/client";
import uuid from "react-uuid";
import { AssetItem } from "../assetItem/assetItem.component";

export function DashboardAssetsList({
  assets,
  loading,
  handleDelete,
  postUpdate
}: {
  assets: Project[] | Blog[] | undefined;
  loading: boolean;
  handleDelete: (id: string) => void;
  postUpdate: (id: string, title: string, description: string) => void;
}) {
  const handleUpdate = (
    id: string,
    title: string,
    description: string,
  ) => {
    postUpdate(id, title, description);
  };
  return (
    <>
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="h-40 w-40 animate-spin rounded-full border-4 border-t-4 border-transparent border-t-red-500"></div>
      </Transition>
      <Transition
        show={!loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          role="list"
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {assets ? (
            assets.map((asset, index) => (
              <AssetItem
                handleUpdate={(
                  id: string,
                  title: string,
                  description: string
                ) => handleUpdate(id, title, description)}
                asset={asset}
                handleDelete={handleDelete}
                key={uuid()}
                index={index}
              />
            ))
          ) : (
            <div className="h-64 w-full bg-zinc-100 dark:bg-zinc-800">
              <h1 className="text-3xl">
                You don't seem to have any posted at the moment
              </h1>
              <p>Go check the db dude something is fugged up</p>
            </div>
          )}
        </ul>
      </Transition>
    </>
  );
}
