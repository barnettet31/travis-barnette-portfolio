import { Button } from "../../../components/button/button.component";
import { DashboardAssetsList } from "../../../components/dashboardAssetList/dashboardAssetList.component";
import { getDashboardLayout } from "../../../components/dashboardLayout/dashboardLayout.component";
import { api } from "../../../utils/api";
import { type NextPageWithLayout } from "../../_app";

const BlogsDashboardLandingPage: NextPageWithLayout = () => {
  const queryClient = api.useContext();
  const { data: blogs, isLoading: loadingBlogs } = api.blogs.getAll.useQuery();
  const { mutate: destroyThisBlog, isLoading:destroyingBlog } = api.blogs.deleteBlog.useMutation({
    onSuccess:async()=>{
      await queryClient.blogs.getAll.invalidate()
    }
  });
  const { mutate: updateThisBlog, isLoading:updatingBlog } = api.blogs.updateBlogMeta.useMutation({
    onSuccess:async()=>{
      await queryClient.blogs.getAll.invalidate()
    }
  })
  const deleteBlog = (blogId: string) => {
    destroyThisBlog({id:blogId});
  }
  const updateBlogMetaData = (
    id: string,
    title: string,
    description: string,
  ) => {
    updateThisBlog({id,title,description})
  };
  return (
    <div className="max-w-7xl px-4 sm:px-6 md:px-8">
      <Button
        className="my-2 flex w-40 justify-center rounded-md bg-red-500 p-2 text-center shadow hover:bg-red-600 active:bg-red-700"
        variant="primary"
        href="/dashboard/blogs/new"
        as="link"
      >
        <span className="mr-4">+</span> New Blog
      </Button>
      <div className="mt-8 w-full md:mt-8 lg:mt-10">
        <DashboardAssetsList
          postUpdate={updateBlogMetaData}
          handleDelete={deleteBlog}
          assets={blogs}
          loading={loadingBlogs || destroyingBlog || updatingBlog}
        />
      </div>
    </div>
  );
};
BlogsDashboardLandingPage.getLayout = getDashboardLayout;
export default BlogsDashboardLandingPage;
