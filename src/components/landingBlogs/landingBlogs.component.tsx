import { type Blog } from "@prisma/client";
import { BlogImage } from "../blogImage/blogImage.component";
import uuid from "react-uuid";
import { BlogSkeleton } from "../blogSkeleton/blogSkeleton.component";
import { Transition } from "@headlessui/react";

export const LandingBlog = ({
  recentBlogs,
  isLoading,
}: {
  recentBlogs: Blog[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <>
      <Transition
        show={isLoading}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BlogSkeleton />
      </Transition>
      <Transition 
        show={!isLoading}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={"div"}
        className="animate flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
        {recentBlogs ? (
          recentBlogs.map(({ title, id, image, createdAt }, index) => (
            <BlogImage
              date={createdAt}
              image={image}
              key={uuid()}
              title={title}
              slug={`/blogs/${id}`}
              index={index}
            />
          ))
        ) : (
          <p className="text-center text-2xl font-medium text-zinc-800 dark:text-zinc-200">
            Unfortunately I have no blogs to show
          </p>
        )}
      </Transition>
    </>
  );
};
