import { type Project } from "@prisma/client";
import { Card } from "../card/card.component";
import { formatDate } from "~/utils/formatDate";
interface IProjectProps{
project:Project
  index:number;
}
export function Project({ project, index }:IProjectProps) {
  return (

      <Card as="article" className={`animate slide delay-${index} min-w-full my-4`}>
        <Card.Title href={`/projects/${project.id}`}>
          {project.title}
        </Card.Title>
        <Card.Eyebrow as="time" decorate>
          {formatDate(project.createdAt)}
        </Card.Eyebrow>
        <Card.Description>{project.description}</Card.Description>
        <Card.Cta>Read about project</Card.Cta>
      </Card>
  );
}
