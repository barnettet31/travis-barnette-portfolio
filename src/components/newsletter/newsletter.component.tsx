/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { MailIcon } from "../../icons/icons.components";
import { Button } from "../button/button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../utils/api";
const validationSchema = z.object({
  email: z.string().email().min(1).max(100),
}).required();

function Spinner(){
  return <div className="w-6 h-6 border-2 border-t-2 border-t-red-500 border-transparent rounded-full animate-spin"></div>
}
export const Newsletter = ()=>{
    const {mutate:submitSubscriber, isLoading} = api.subscribe.sendThankYou.useMutation()
    const { register, handleSubmit, reset } = useForm<{email:string}>({
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(validationSchema),
      reValidateMode:"onSubmit"
    });
    const handleOnSubmit = (data: { email: string }) => {
      void submitSubscriber({email:data.email})
      reset();
    }
    return (
      <form
        onSubmit={handleSubmit((data)=>handleOnSubmit(data))}
        action="/thank-you"
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Stay up to date</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Get notified when I publish something new, and unsubscribe at any
          time.
        </p>
        <div className="mt-6 flex">
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 sm:text-sm"
          />
          <Button disabled={false} as="button" variant="primary" onClick={()=>console.log('test')} type="submit" className="ml-4 flex-none">
            {isLoading ?  <Spinner /> : "Subscribe"}
          </Button>
        </div>
      </form>
    );
}