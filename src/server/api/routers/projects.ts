import { z } from "zod";
import
{
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { handleDeleteFromGoogleCloud } from "../utils/gcs";

export const projectRouter = createTRPCRouter({
    get: protectedProcedure.input(z.object({ id: z.string() })).query(async({ ctx, input }) =>
    {
        try
        {
         const data = await ctx.prisma.project.findUnique({
            where:{
                id:input.id
            }
         });
         return data; 
        }
        catch (error)
        {
            console.log(error);
        }
    }),

    getAll: protectedProcedure.query(async ({ ctx }) =>
    {
        try
        {
            const data = await ctx.prisma.project.findMany();

            return data;
        }
        catch (e)
        {
            console.log(e);
        }

    }),

    getLatest: publicProcedure.query(async ({ ctx }) =>
    {
        const data = await ctx.prisma.project.findMany({
            where: {
                userId: ctx.session?.user.id
            },


        });
        const threeMostRecentProjects = data.sort((a, b) => new Date(b.createdAt).getUTCSeconds() - new Date(a.createdAt).getUTCSeconds()).slice(0, 4);
        return threeMostRecentProjects;
    }),
    updateProject: protectedProcedure.input(z.object({ id: z.string(), title: z.string(), content: z.string() })).mutation(async ({ ctx, input }) =>
    {
        const data = await ctx.prisma.project.update({
            where: {
                id: input.id
            },
            data: {
                title: input.title,
                content: input.content,
                updatedAt: new Date()
            }
        });
        return data;
    }),
    updateProjectMeta: protectedProcedure.input(z.object({ id: z.string(), description: z.string(), title: z.string() })).mutation(async ({ ctx, input }) =>
    {
        try
        {
            const data = await ctx.prisma.project.update({
                where: {
                    id: input.id
                },
                data: {
                    description: input.description,
                    title: input.title
                }
            });
            return data;
        } catch (e)
        {
            console.log(e);
        }
    }),
    createProject: protectedProcedure.input(z.object({ title: z.string(), content: z.string(), description: z.string(), image: z.string(), imageId: z.string(), liveUrl: z.string() })).mutation(async ({ ctx, input }) =>
    {

        try
        {
            const data = await ctx.prisma.project.create({
                data: {
                    title: input.title,
                    content: input.content,
                    description: input.description,
                    userId: ctx.session?.user.id,
                    status: 'published',
                    image: input.image,
                    imageId: input.imageId
                }
            });
            return data;
        } catch (e)
        {
            console.log(e);
        }


    }),
    deleteProject: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) =>
    {
        const data = await ctx.prisma.project.delete({
            where: {
                id: input.id
            }
        });
        const deletedFile = await handleDeleteFromGoogleCloud(`projects/images/${data.imageId}.jpg`);
        return deletedFile;


        //TODO delete project content from google cloud
    })
});
