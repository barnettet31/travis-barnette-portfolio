import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../utils/formatDate";
interface IBlogImageProps
{
    slug: string;
    title: string;
    index: number;
    image: string;
    date: Date;
}

export const BlogImage = ({
  slug,
  title,
  index,
  image,
  date,
}: IBlogImageProps) => {
  return (
    <Link
      href={`${slug}`}
      className={`animate slide rounded-full delay-${
        index + 1
      } group relative aspect-video w-full flex-none block overflow-hidden rounded-xl after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-black sm:rounded-2xl lg:w-80`}
    >
      <Image
        src={image}
        alt={title}
        width={1920}
        height={1080}
        className="object-cover"
      />
      <div className="absolute bottom-4 left-4 z-10 text-left">
        <h3 className="text-2xl font-bold text-zinc-200 duration-200 ease-in group-hover:text-red-500 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-xs text-zinc-200 duration-200 ease-in group-hover:text-red-500 dark:text-zinc-100">
          {formatDate(date)}
        </p>
      </div>
    </Link>
  );
};