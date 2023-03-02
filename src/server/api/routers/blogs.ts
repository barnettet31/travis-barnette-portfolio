import { z } from "zod";
import
{
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { handleDeleteFromGoogleCloud } from "../utils/gcs";

export const blogRouter = createTRPCRouter({
    get: publicProcedure.input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) =>
        {
            try
            {
                const data = await ctx.prisma.blog.findUnique({ where: { id: input.id }, select: { id: true } });
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
            const data = await ctx.prisma.blog.findMany({
                where: {
                    userId: ctx.session?.user.id
                }
            });
            return data;

        } catch (e)
        {
            console.log('Error Fetching all blogs', e);
            return [];
        }

    }),

    getLatest: publicProcedure.query(async ({ ctx }) =>
    {
        const data = await ctx.prisma.blog.findMany({
            where: {
                userId: ctx.session?.user.id
            },


        });
        const threeMostRecentBlogs = data.sort((a, b) => new Date(b.createdAt).getUTCSeconds() - new Date(a.createdAt).getUTCSeconds()).slice(0, 4);
        return threeMostRecentBlogs;
    }),
    updateBlog: protectedProcedure.input(z.object({ id: z.string(), title: z.string(), content: z.string() })).mutation(async ({ ctx, input }) =>
    {
        const data = await ctx.prisma.blog.update({
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
    updateBlogMeta: protectedProcedure.input(z.object({ id: z.string(), description: z.string(), title: z.string() })).mutation(async ({ ctx, input }) =>
    {
        try
        {
            const data = await ctx.prisma.blog.update({
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
    createBlog: protectedProcedure.input(z.object({ title: z.string(), content: z.string(), description: z.string(), image: z.string(), imageId: z.string() })).mutation(async ({ ctx, input }) =>
    {

        try
        {
            const data = await ctx.prisma.blog.create({
                data: {
                    title: input.title,
                    content: input.content,
                    description: input.description,
                    userId: ctx.session?.user.id,
                    image: input.image,
                    imageId: input.imageId,
                    status: 'published'
                }
            });
            return data;
        } catch (e)
        {
            console.log(e);
        }


    }),
    deleteBlog: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) =>
    {
        try
        {
            const data = await ctx.prisma.blog.delete({
                where: {
                    id: input.id
                },
                select: {
                    imageId: true
                }
            });
            //TODO - delete image from google cloud
            const deletedFile = await handleDeleteFromGoogleCloud(`blogs/${data.imageId}.jpg`);
            return deletedFile;
        }
        catch (e)
        {
            console.log(e);
        }
    })
});
