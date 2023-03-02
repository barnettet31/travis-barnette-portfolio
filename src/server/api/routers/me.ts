import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const meRouter = createTRPCRouter({
  get: protectedProcedure
    
    .query(async({  ctx }) => {
     try{
      const data = await ctx.prisma.user.findUnique({
        where:{
          id:ctx.session.user.id
        },
        select:{
          name:true,
          email:true
        }
      });
      return data;
     }catch(e){
      console.error(e);
     }
    })
});
