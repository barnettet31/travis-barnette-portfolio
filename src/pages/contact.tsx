import { getPublicLayout } from "../components/publicLayout/publicLayout.component";
import { type NextPageWithLayout } from "./_app";

const ArticlesPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Articles</h1>
    </div>
  );
};

ArticlesPage.getLayout = getPublicLayout;

export default ArticlesPage;
