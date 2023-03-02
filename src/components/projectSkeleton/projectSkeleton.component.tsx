export const ProjectSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array(3)
        .fill("")
        .map((_, index) => (
          <div key={index} className="flex h-20 rounded-xl w-full flex-col my-8 bg-zinc-600"></div>
        ))}
    </div>
  );
};
