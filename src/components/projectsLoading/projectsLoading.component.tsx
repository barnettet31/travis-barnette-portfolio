
export const ProjectsLoading = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="mt-8 h-60 w-full items-center justify-center self-center "
          >
            <div className="h-full w-full animate-pulse rounded-lg border-t-2 border-b-2 border-gray-900 bg-zinc-600"></div>
          </div>
        ))}
    </>
  );
};
