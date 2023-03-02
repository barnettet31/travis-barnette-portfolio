import { Button } from "../button/button.component";

export const ProjectsError = ({location}:{location:string}) => {
  return (
    <div className="grid place-items-center px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">Oops...</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {location.replace(location.charAt(0), location.charAt(0).toUpperCase())} not
          found
        </h1>
        <p className="mt-6 text-base leading-7">
          Sorry, I seemed to have misplaced my {location}.... try coming back
          later?
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button
            variant="primary"
            as="link"
            href="/"
            className="font-semiboldshadow-sm w-full rounded-md bg-red-600 px-3.5 py-2.5 text-sm hover:bg-red-500"
          >
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
};
