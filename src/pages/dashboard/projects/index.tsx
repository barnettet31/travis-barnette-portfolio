import { getDashboardLayout } from "../../../components/dashboardLayout/dashboardLayout.component";
import { type NextPageWithLayout } from "../../_app";
import { api } from "../../../utils/api";
import { DashboardAssetsList } from "../../../components/dashboardAssetList/dashboardAssetList.component";
import { Button } from "../../../components/button/button.component";

const ProjectsDashboardLandingPage: NextPageWithLayout = () => {
  const queryClient = api.useContext();

  const { data: projects, isLoading: loadingProjects } =
    api.projects.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  const { mutate: destroyThisProject, isLoading:destroyingThisProject } = api.projects.deleteProject.useMutation(
    {
      onSuccess: async () => {
        await queryClient.projects.getAll.invalidate();
      },
    }
  );
  const deleteProject = (projectId: string) => {
    destroyThisProject({ id: projectId });
  };
  const { mutate: updateProjectMetaData, isLoading: updatingProject } =
    api.projects.updateProjectMeta.useMutation({
      onSuccess: async () => {
        await queryClient.projects.getAll.invalidate();
      },
    });
  const updateThisProjectMetaData = (
    id: string,
    title: string,
    description: string
  ) => {
    updateProjectMetaData({ id, title, description });
  };
  return (
    <div className="max-w-7xl px-4 sm:px-6 md:px-8">
      <Button
        className="my-2 flex w-40 justify-center rounded-xl bg-red-500 p-2 text-center shadow hover:bg-red-600 active:bg-red-700"
        variant="primary"
        href="/dashboard/projects/new"
        as="link"
      >
        <span className="mr-4">+</span> New Project
      </Button>
      <div className="mt-4 w-full md:mt-6 lg:mt-8">
        <DashboardAssetsList
          postUpdate={updateThisProjectMetaData}
          handleDelete={deleteProject}
          assets={projects}
          loading={loadingProjects || destroyingThisProject || updatingProject}
        />
      </div>
    </div>
  );
};
ProjectsDashboardLandingPage.getLayout = getDashboardLayout;

export default ProjectsDashboardLandingPage;
