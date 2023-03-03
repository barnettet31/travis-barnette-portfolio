/* eslint-disable @typescript-eslint/require-await */
import parse from "html-react-parser";
import { getPublicLayout } from "../../components/publicLayout/publicLayout.component";
import { Prose } from "../../components/prose/prose.component";
import { Container } from "../../components/container/container.component";
import Head from "next/head";
import { type GetStaticProps } from "next";
import { prisma } from "../../server/db";
import Image from "next/image";
import { Button } from "../../components/button/button.component";
interface IBlogPageProps {
  source: string;
  meta: {
    title: string;
    description: string;
    image: string;
  };
  link: string;
}

const ProjectPage = ({ source, meta, link }: IBlogPageProps) => {
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
                className="rounded-lg shadow-lg mb-4"
              />
              <Button href={link} className="my-4 text-2xl font-bold underline" variant="secondary" as="externalLink">See The Live Site</Button>
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
  if (!params || !params.projectId || typeof params.projectId !== "string") {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
  const projectId = params.projectId;
  const projectInfo = await prisma.project.findUnique({
    where: { id: projectId },
  });
   if (!projectInfo) {
     return {
       notFound: true,
       revalidate: 60,
     };
   }
   const meta = {
     title: projectInfo.title,
     description: projectInfo.description,
     image: projectInfo.image,
   };

   return {
     props: {
       source: projectInfo.content,
       meta: meta,
       link:projectInfo.liveUrl
     },
      revalidate: 60,
   };
};
export default ProjectPage;
