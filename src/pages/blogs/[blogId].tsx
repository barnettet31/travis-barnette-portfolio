/* eslint-disable @typescript-eslint/require-await */
import { getPublicLayout } from "../../components/publicLayout/publicLayout.component";
import { Prose } from "../../components/prose/prose.component";
import { Container } from "../../components/container/container.component";
import Head from "next/head";
import { type GetStaticProps } from "next";
import { prisma } from "../../server/db";
import Image from "next/image";
import  parse  from "html-react-parser";
interface IBlogPageProps {
  source: string;
  meta: {
    title: string;
    description: string;
    image: string;
  };
}

const BlogPage = ({ source, meta }: IBlogPageProps) => {
  return (
    <>
      <Head>
        <title>{meta.title} | Travis Barnette</title>
        <meta name="description" content={meta.description} />
      </Head>
      {getPublicLayout(
        <div className="mt-8 self-center">
          <Container>
            <article>
              <Image
                src={meta.image}
                alt={meta.title}
                width={1200}
                height={630}
                className="rounded-lg shadow-lg"
              />
              <Prose className="mt-8">
                <>{parse(source)}</>
              </Prose>
            </article>
          </Container>
        </div>
      )}
    </>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.blogId || typeof params.blogId !== "string") {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
  const blogId = params.blogId;
  const blogInfo = await prisma.blog.findUnique({
    where: { id: blogId },
  });
  if (!blogInfo) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
  const meta = {
    title: blogInfo.title,
    description: blogInfo.description,
    image: blogInfo.image,
  };
  

  return {
    props: {
      source: blogInfo.content,
      meta: meta,
    },
    revalidate: 60,
  };
};
export default BlogPage;
