/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDashboardLayout } from "../../../components/dashboardLayout/dashboardLayout.component";
import { api } from "../../../utils/api";
import { type NextPageWithLayout } from "../../_app";
import { useMutation } from "@tanstack/react-query";
import { postPhoto } from "../../../axios/postPhoto";
import { useRouter } from "next/router";
import { LoadOverlay } from "../../../components/loadOverlay/loadOverlay.component";
import { ContentEditor } from "../../../components/editor/editor.component";
import { useState } from "react";
import { MetaDialog } from "../../../components/metaDialog/metaDialog.component";
const NewProject: NextPageWithLayout = () => {
  const [image, setImage] = useState<File | null>(null);
  const [showMetaEditor, setShowMetaEditor] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<{title:string; description:string; liveUrl:string} | null>(null);
  const router = useRouter();

  const { isLoading: postingProject, mutateAsync: postFile } =
    api.projects.createProject.useMutation({
      onSuccess: async (d) => {
        if (!d || !d.id) {
          await router.replace(`/dashboard`);
          return console.log(
            "error occurred posting project here is the data:",
            d
          );
        }
        await router.replace(`/dashboard/projects/edit/${d.id}`);
      },
      onError: (err) => {
        console.log(err.message);
      },
    });
  ///pass fetch to queryClient and use it in the mutation
  const { mutateAsync: postProjectPhoto, isLoading: postingPhoto } =
    useMutation({
      mutationFn: (photoData: { file: string; location: string }) => {
        return postPhoto(photoData.file, photoData.location);
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const convertToBase64 = (f: File) => {
    //convert file to base64
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePost = async (d: string) => {
    //first post the photo to get the id
    if (!image) return console.log("no image selected");
    if(!metaData) return setShowMetaEditor(true);
    if (!metaData.liveUrl || !metaData.description || !metaData.title) return console.log("Project Meta Data Required");

    try {
      const base64 = await convertToBase64(image);
      if (!base64) return console.log("error converting image to base64");
      const photoId = await postProjectPhoto({
        file: base64,
        location: "projects/images",
      });
      if (!photoId) return console.log("error posting photo");
      const fileData = await postFile({
        title: metaData.title,

        content: d,
        imageId: photoId.photoId,
        image: photoId.photoUrl,
        description: metaData.description,
        liveUrl: metaData.liveUrl,
      });
      if (!fileData) return await router.replace("/dashboard");
      await router.replace(`/dashboard/projects/edit/${fileData.id}`);
      //then post the project with the photo id
    } catch (e) {
      console.log(e);
      await router.replace(`/dashboard`);
    }
  };
  if (postingProject || postingPhoto) return <LoadOverlay />;
  return (
    <>
      {" "}
      <ContentEditor
        isLoading={postingProject || postingPhoto}
        handleSave={handlePost}
        assetTitle={metaData?.title || "New Project"}
        content="<p>Content coming soon...</p>"
        imageAdd={true}
        addImageFunc={(d: File) => setImage(d)}
        showMeta={()=>setShowMetaEditor(true)}
      />
      <MetaDialog
        editMeta={showMetaEditor}
        hasLiveUrl={true}
        setIsEditMeta={setShowMetaEditor}
        submitHandler={(d)=>{

            setMetaData({title:d.title, description:d.description, liveUrl:d.liveUrl??""});
            console.log(metaData)
            setShowMetaEditor(false);
        }}
      />
    </>
  );
};
NewProject.getLayout = getDashboardLayout;
export default NewProject;
