import { getDashboardLayout } from "../../../../components/dashboardLayout/dashboardLayout.component";
import { prisma } from "../../../../server/db";
import { api } from "../../../../utils/api";
import { ContentEditor } from "../../../../components/editor/editor.component";
import { LoadOverlay } from "~/components/loadOverlay/loadOverlay.component";
const DashboardBlogPage = ({
  blogTitle,
  blogContent,
  blogId,
}: {
  blogTitle: string;
  blogContent: string;
  blogId: string;
}) => {
  const { mutate, isLoading } = api.blogs.updateBlog.useMutation();
  const handleSave = (d:string) => {
      mutate({
        id: blogId,
        title: blogTitle,
        content: d,
      });
    
  };
   if (isLoading) return <LoadOverlay />;

  return (
   <ContentEditor isLoading={isLoading} handleSave={handleSave} assetTitle={blogTitle} content={blogContent}/>
  );
};

DashboardBlogPage.getLayout = getDashboardLayout;

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

type Params = {
  params: {
    blogId: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  const blogId = params.blogId;
  try {
    const blogInfo = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    if (!blogInfo) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }
    return {
      props: {
        blogTitle: blogInfo.title,
        blogContent: blogInfo.content,
        blogId: blogInfo.id,
      },
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};
export default DashboardBlogPage;
