import { type Project } from "@prisma/client";
import { Project as ProjectCard } from "../projects/projects.component";
import uuid from "react-uuid";
import { ProjectSkeleton } from "../projectSkeleton/projectSkeleton.component";
import { Transition } from "@headlessui/react";

export const LandingProjects = ({
  projects,
  isLoading,
}: {
  projects: Project[] | undefined;
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
        <ProjectSkeleton />
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
        className="animate flex w-full flex-col items-center gap-4 lg:justify-between"
      >
        {projects ? (
          projects.map((project, index) => (
            <ProjectCard index={index} key={uuid()} project={project} />
          ))
        ) : (
          <p className="text-center text-2xl font-medium text-zinc-800 dark:text-zinc-200">
            Currently I have no projects to show
          </p>
        )}
      </Transition>
    </>
  );
};
