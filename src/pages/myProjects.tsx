/* eslint-disable react/no-unescaped-entities */
import { Container } from "../components/container/container.component";
import { getPublicLayout } from "../components/publicLayout/publicLayout.component";
import { Transition } from "@headlessui/react";
import { ProjectCard } from "../components/projectCard/projectCard.component";
import { type Project } from "@prisma/client";
import { prisma } from "../server/db";
const ProjectsPage = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="mt-20 py-8">
      <Container>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            All the projects and challenges I've built to learn and grow as a
            developer.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I have a number of personal projects that I've built over my years
            as a developer. Here are all of them listed in order of when I built
            them. I've included a description of each project and a link to an
            article about them and their inspiration (live links are in there).
            I hope you enjoy them!
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
              <ProjectCard projects={projects} />
            </Transition>
          </ul>
        </div>
      </Container>
    </div>
  );
};

ProjectsPage.getLayout = getPublicLayout;

export async function getStaticProps() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
    });
    const projectsToReturn = projects.map((project) => {
      return {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
      };
    });
    return {
      props: { projects: projectsToReturn },
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
export default ProjectsPage;
