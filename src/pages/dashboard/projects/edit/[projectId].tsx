import { getDashboardLayout } from "../../../../components/dashboardLayout/dashboardLayout.component";
import { prisma } from "../../../../server/db";
import { api } from "../../../../utils/api";
import { ContentEditor } from "../../../../components/editor/editor.component";
import { LoadOverlay } from "~/components/loadOverlay/loadOverlay.component";
const DashboardProjectPage = ({
  projectTitle,
  projectContent,
  projectId,
}: {
  projectTitle: string;
  projectContent: string;
  projectId: string;
}) => {
  const { mutate, isLoading } = api.projects.updateProject.useMutation();
  const handleSave = (d: string) => {
    mutate({
      id: projectId,
      title: projectTitle,
      content: d,
    });
  };
  if (isLoading) return <LoadOverlay />;

  return (
    <ContentEditor
      isLoading={isLoading}
      handleSave={handleSave}
      assetTitle={projectTitle}
      content={projectContent}
    />
  );
};

DashboardProjectPage.getLayout = getDashboardLayout;

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

type Params = {
  params: {
    projectId: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  const projectId = params.projectId;
  try {
    const projectInfo = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!projectInfo) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }
    return {
      props: {
        projectTitle: projectInfo.title,
        projectContent: projectInfo.content,
        projectId: projectInfo.id,
      },
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};
export default DashboardProjectPage;
