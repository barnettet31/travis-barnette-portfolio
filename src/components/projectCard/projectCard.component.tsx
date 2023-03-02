import { type Project } from "@prisma/client";
import { ProjectsError } from "../projectsError/projectsError.component";
import { Card } from "../card/card.component";
import uuid from "react-uuid";
import Image from "next/image";

export const ProjectCard = ({
  projects,
}:{projects: Project[]|undefined
}) => {
  if (!projects) return <ProjectsError location="projects" />;
  return (
    <>
      {projects.map((project) => (
        <Card key={uuid()} as="li">
          <div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image
              src={project.image}
              alt=""
              className="h-full w-full"
              unoptimized
              width={32}
              height={32}
            />
          </div>
          <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <Card.Link href={`/projects/${project.id}`}>
              {project.title}
            </Card.Link>
          </h2>
          <Card.Description>{project.description}</Card.Description>
        </Card>
      ))}
    </>
  );
};
