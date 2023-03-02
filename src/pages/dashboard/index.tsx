import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { type NextPageWithLayout } from "../_app";
import { getDashboardLayout } from "../../components/dashboardLayout/dashboardLayout.component";
import { api } from "../../utils/api";

 const Dashboard:NextPageWithLayout = () => {
    const {data, isLoading} = api.me.get.useQuery();
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <h1>{data?.email}</h1>
        </div>
    );
}

Dashboard.getLayout = getDashboardLayout;
export async function getServerSideProps(context:GetServerSidePropsContext) {

  const session = await getSession(context);
  if (session?.user?.email !== "barnette.travis31@gmail.com") {
    return {
      redirect: {
        destination: "/no",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}



export default Dashboard;