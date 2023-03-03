import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  type Editor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight/lib/core";
import { useEffect, useState } from "react";
import {  MenuBar } from "../menuBar/menuBar.component";
interface IContentEditorProps {
  handleSave: (content: string) => void;
  isLoading: boolean;
  assetTitle?: string;
  content?: string;
  imageAdd?: boolean;
  addImageFunc?: (d: File) => void;
  showMeta?: () => void;
}


export const ContentEditor = ({
  handleSave,
  isLoading,
  assetTitle,
  content,
  imageAdd,
addImageFunc, 
showMeta
}: IContentEditorProps) => {
  const [isEditable] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        codeBlock:{
          HTMLAttributes: {
            class: "bg-zinc-800 text-gray-100 p-4 rounded-md shadow-md",
          },
          
        },
        heading:{
          HTMLAttributes: {
            class:"text-3xl font-bold"
          }
        }
        
      }),
    ],
    content: content || "Your content goes here",
    editorProps: {
      attributes: {
        class:
          "h-full min-h-[500px] static bg-zinc-800 max-w-none text-gray-100 prose md:prose-xl dark:prose-invert w-full mx-auto p-4 z-0 m-5 focus:outline-none rounded-md shadow-md",
      },
    },
  });
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);
  const saveButtonHandler = (editor: Editor | null) => {
    if (!editor) return;
    handleSave(editor.getHTML());
  };
  return (
    <div className=" mx-auto h-full max-w-7xl sm:px-6 lg:px-8 min-h-[500px]">
      <MenuBar
        imageAdd={imageAdd}
        addImageFunc={addImageFunc}
        editor={editor}
        saveFunc={saveButtonHandler}
        title={assetTitle}
        isLoading={isLoading}
        showMeta={showMeta}
      />
      <EditorContent editor={editor} />
    </div>
  );
};
