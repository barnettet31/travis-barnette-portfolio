/* eslint-disable react/no-unescaped-entities */
import { Container } from "../components/container/container.component";
import { getPublicLayout } from "../components/publicLayout/publicLayout.component";
import { Transition } from "@headlessui/react";
import { BlogCard } from "../components/blogCard/blogCard.component";
import { type Blog } from "@prisma/client";
import { prisma } from "../server/db";
const BlogPage = ({blogs}:{blogs:Blog[]}) => {
  return (
    <div className="mt-20 py-8">
      <Container>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Stories about my life and what I've been able to learn from it.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Occassionally I get the opportunity to do something incredible, and
            here's where I share those stories with you.
          </p>
        </header>
        <div className="my-16 sm:my-20">
          <ul role="list" className="w-full">
            <Transition
              show={true}
              enter="transition-all duration-500"
              enterFrom="opacity-0 transform -translate-y-4"
              enterTo="opacity-100 transform translate-y-0"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as={"div"}
              className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
            >
             <BlogCard blogs={blogs} />
            </Transition>
          </ul>
        </div>
      </Container>
    </div>
  );
};

BlogPage.getLayout = getPublicLayout;

export async function getStaticProps() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: "desc" },
    });
    const blogsToReturn = blogs.map((blog) => {
      return {
        ...blog,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
      };
    });
    return {
      props: { blogs: blogsToReturn },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
      revalidate: 1,
    };
  }
}
export default BlogPage;
