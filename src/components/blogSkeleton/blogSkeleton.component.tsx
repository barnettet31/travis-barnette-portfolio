import { Container } from "../container/container.component";

export const BlogSkeleton = () => {
  return (
    <div className="mt-8 self-center">
      <Container>
        <div className="flex gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-40 w-full animate-pulse rounded-lg bg-zinc-600 lg:w-80"
              ></div>
            ))}
        </div>
      </Container>
    </div>
  );
};
