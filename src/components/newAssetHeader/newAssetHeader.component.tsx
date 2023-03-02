/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
export interface IFormValues {
  image: FileList;
  title: string;
  description: string;
}
interface INewAssetHeaderProps {
  isLoading: boolean;
  handleSubmission: (d: IFormValues) => Promise<void>;
  location:string;
}
export const NewAssetHeader = ({
  isLoading,
  handleSubmission,
  location,
}: INewAssetHeaderProps) => {
  const { register, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues: {
      image: undefined,
      title: "",
      description: "",
    },
  });
  const handleOnSubmit = async (data: {
    image: FileList;
    title: string;
    description: string;
  }) => {
    await handleSubmission(data);
    reset();
  };
  return (
    <form
      className="flex justify-between items-center gap-3 px-4"
      onSubmit={handleSubmit((data) => handleOnSubmit(data))}
    >
      <div className="flex flex-col gap-3">
        <input
          type="file"
          {...register("image")}
          required={true}
          className="text-grey-500 text-sm
            file:mr-5 file:rounded-full file:border-0
            file:bg-red-500 file:py-2
            file:px-6 file:text-sm
            file:font-medium file:text-white
            hover:file:cursor-pointer hover:file:bg-red-50
            hover:file:text-red-700"
        />
        <div>
          <input
            type="text"
            {...register("title")}
            className="block w-full rounded-md border-gray-300 bg-transparent text-red-500 shadow-sm outline-none outline-0 sm:text-sm"
            placeholder={`${location} Title` }
          />
        </div>
        <div className="">
          {" "}
          <input
            type="text"
            {...register("description")}
            className="block w-full rounded-md border-gray-300 bg-transparent text-red-500 shadow-sm outline-none outline-0 sm:text-sm"
            placeholder={`${location} Description`}
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className="text-grey-500
            mr-5 rounded-full border-0
            bg-red-500 py-2
            px-6 text-sm
            font-medium text-white
            hover:cursor-pointer hover:bg-red-50
            hover:text-red-700
            disabled:opacity-50"
        type="submit"
      >
        {isLoading ? "Posting..." : "Submit"}
      </button>
    </form>
  );
};
