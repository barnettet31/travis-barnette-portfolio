import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { type Editor } from "@tiptap/react";
import { Fragment } from "react";

export interface IMenuOption {
  name: string;
  onClick: () => void;
  disabled: boolean | null;
  isActive: boolean | null;
}

interface IMenuBarProps {
  editor: Editor | null;
  saveFunc: (editor: Editor | null) => void;
  title: string | undefined;
  isLoading: boolean;
  imageAdd?: boolean;
  addImageFunc?: (d: File) => void;
  showMeta?: () => void;
}

export const MenuBar = ({
  editor,
  saveFunc,
  title,
  isLoading,
  imageAdd = false,
  addImageFunc,
  showMeta,
}: IMenuBarProps) => {
  if (!editor) {
    return null;
  }
  const eventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!addImageFunc) return;
    if (!event.target.files) return;
    if (event.target.files.length === 0) return;
    if (!event.target.files[0]) return;
    addImageFunc(event.target.files[0]);
  };
  const addImageButton = imageAdd
    ? [
        {
          name: "Add Image",
          onClick: () => {
            const inputElement = document.getElementById("imageInput");
            if (inputElement) {
              inputElement.click();
            }
          },
          disabled: null,
          isActive: null,
        },
      ]
    : [];
  const showMetaButton = showMeta
    ? [
        {
          name: "Show MetaContent",
          onClick: () => showMeta(),
          disabled: null,
          isActive: null,
        },
      ]
    : [];
  const menuOptions = [
    {
      name: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      name: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      name: "Strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      name: "H1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      disabled: null,
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
    {
      name: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      disabled: null,
      isActive: editor.isActive("paragraph"),
    },
    {
      name: "H2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      disabled: null,
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: null,
      isActive: editor.isActive("bulletList"),
    },
    {
      name: "Ordered List",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: null,
      isActive: editor.isActive("orderedList"),
    },
    {
      name: "Code Block",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: null,
      isActive: editor.isActive("codeBlock"),
    },
    {
      name: "Block Quote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: null,
      isActive: editor.isActive("blockquote"),
    },

    {
      name: "Hard Break",
      onClick: () => editor.chain().focus().setHardBreak().run(),
      disabled: null,
      isActive: null,
    },
    {
      name: "Undo",
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      isActive: null,
    },
    {
      name: "Redo",
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
      isActive: null,
    },
    ...addImageButton,
    ...showMetaButton,
    {
      name: "Save",
      onClick: () => saveFunc(editor),
      disabled: isLoading,
      isActive: null,
    },
  ];

  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-800 py-2 px-4">
      <h2 className="text-2xl">
        <span className="mr-2 font-bold">Title:</span> {title}
      </h2>
      <div className="flex gap-2">
        <Menu as={"div"} className="relative z-10">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-zinc-700 p-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-500">
            <Bars3Icon className="h-6 w-6" />
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
            <Menu.Items>
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-zinc-700 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {menuOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      <button
                        className={`data-active:font-bold w-full px-4 py-2 text-left text-sm  hover:bg-zinc-600 hover:text-red-600`}
                        data-active={option.isActive}
                        onClick={() => option.onClick()}
                        disabled={option.disabled ? option.disabled : false}
                      >
                        {option.name}
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {imageAdd ? (
          <input
            onChange={eventHandler}
            type="file"
            id="imageInput"
            className="hidden"
          />
        ) : null}
      </div>
    </div>
  );
};
