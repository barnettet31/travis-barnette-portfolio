import { getPublicLayout } from "../components/publicLayout/publicLayout.component";
import { type NextPageWithLayout } from "./_app";
import Image from "next/image";
 const NoPage:NextPageWithLayout = ()=>{
    return <div className="grid place-items-center h-full">
        <Image src="/no.png" width={300} height={300} alt="no" />
    </div>
}
NoPage.getLayout = getPublicLayout;
export default NoPage;