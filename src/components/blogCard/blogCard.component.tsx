import { type Blog } from "@prisma/client";
import { ProjectsError } from "../projectsError/projectsError.component";
import { Card } from "../card/card.component";
import uuid from "react-uuid";
import Image from "next/image";
export const BlogCard = ({blogs}:{blogs:Blog[]|undefined})=>{
if(!blogs) return <ProjectsError location="blogs" />
 return (
   <>
     {blogs.map((blog) => (
       <Card as="li" key={uuid()}>
         <div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
           <Image
             src={blog.image}
             alt=""
             className="h-full w-full"
             unoptimized
             width={32}
             height={32}
           />
         </div>
         <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
           <Card.Link href={`/blogs/${blog.id}`}>{blog.title}</Card.Link>
         </h2>
         <Card.Description>{blog.description}</Card.Description>
         <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500 dark:text-zinc-200">
           {blog.title}
         </p>
       </Card>
     ))}
   </>
 );
 }