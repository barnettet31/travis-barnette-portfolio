/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Transition } from "@headlessui/react";
import { type Blog, type Project } from "@prisma/client";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

export function MetaDialog({
  asset,
  setIsEditMeta,
  editMeta,
  submitHandler,
  hasLiveUrl = false,
}: {
  asset?: Project | Blog;
  setIsEditMeta: (value: boolean) => void;
  editMeta: boolean;
  submitHandler: (data: { title: string; description: string; liveUrl?:string; }) => void;
  hasLiveUrl?: boolean;
}) {
  const { register, handleSubmit } = useForm<{
    title: string;
    description: string;
    liveUrl: string;
  }>({
    defaultValues: {
      title: asset?.title || "",
      description: asset?.description || "",
      liveUrl: "",
    },
  });
  return (
    <Transition
      show={editMeta}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        className="fixed top-0 z-10 grid h-screen w-screen place-items-center"
        open={editMeta}
        as="div"
        onClose={() => setIsEditMeta(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 h-screen w-screen bg-black bg-opacity-75" />
        </Transition.Child>
        <Dialog.Panel className="z-10 rounded-md bg-zinc-800 text-white shadow sm:rounded-lg w-1/2">
          <div className="px-4 py-5 sm:p-6">
            <Dialog.Title className="text-base font-semibold leading-6">
              Update Meta Data
            </Dialog.Title>
            <div className="mt-2 max-w-xl text-sm ">
              <Dialog.Description>
                This will update the meta data for the asset
              </Dialog.Description>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="mt-5 w-full"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label htmlFor="email" className="sr-only">
                    Title
                  </label>
                  <input
                    {...register("title")}
                    className="block w-full rounded-md border-gray-300 py-2 pl-2 text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    placeholder="Title"
                  />
                </div>
                {hasLiveUrl ? (
                  <div className="w-full">
                    <label htmlFor="email" className="sr-only">
                      Live Url
                    </label>
                    <input
                      {...register("liveUrl")}
                      className="block w-full rounded-md border-gray-300 py-2 pl-2 text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      placeholder="Live Site Url"
                    />
                  </div>
                ) : null}
                <div className="w-full ">
                  <label htmlFor="email" className="sr-only">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center self-end rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700"
              >
                Save
              </button>
            </form>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
