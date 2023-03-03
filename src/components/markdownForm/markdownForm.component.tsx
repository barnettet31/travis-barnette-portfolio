/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Transition } from "@headlessui/react";
import { type Editor } from "@tiptap/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import showdown from "showdown";

export const MarkdownForm =({markdownShown, setMarkdownShown, editor}:{markdownShown:boolean; setMarkdownShown:(t:boolean)=>void; editor:Editor})=>{
    //this is a form that will allow the user to convert their markdown to html
    const {handleSubmit, register} = useForm<{content:""}>({
        defaultValues:{
            content:""
        }
    });
    const onSubmit = (data:{content:''})=>{
        const showDownConverter = new showdown.Converter();
        const contentConvertedToHTML = showDownConverter.makeHtml(data.content) ;
        editor.commands.setContent(contentConvertedToHTML);
        setMarkdownShown(false);
    }
    return (
      <Transition
        show={markdownShown}
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
          open={markdownShown}
          as="div"
          onClose={() => setMarkdownShown(false)}
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
          <Dialog.Panel className="z-10 w-1/2 rounded-md bg-zinc-800 text-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Dialog.Title className="text-base font-semibold leading-6">
                Set Markdown Content
              </Dialog.Title>
              <div className="mt-2 max-w-xl text-sm ">
                <Dialog.Description>
                  This will allow you to set the markdown content for this page.
                </Dialog.Description>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
                <div className="flex flex-col gap-2">
                  <div className="w-full ">
                    <label htmlFor="email" className="sr-only">
                      Markdown
                    </label>
                    <textarea
                    rows={15}
                      {...register("content", { required: true })}
                      className="block w-full p-2 rounded-md border-gray-300 text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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