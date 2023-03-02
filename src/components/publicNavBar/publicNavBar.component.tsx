import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "../darkModeToggle/darkmodeToggle.component";
import { DesktopNav } from "../desktopNav/desktopNav.component";
import { MobileNavigation } from "../mobileNavigation/mobileNavigation.component";

export const PublicNavBar = () => {
  const { pathname } = useRouter();
  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1">
        {pathname === "/" ? (
          <div />
        ) : (
          <Link href="/">
            <Image
              src="/profile.jpg"
              className="rounded-full"
              width={40}
              height={40}
              alt="Travis Barnette"
            />
          </Link>
        )}
      </div>
      <div className="mr-4 flex flex-1 justify-end md:m-auto md:justify-center">
        <DesktopNav />
        <MobileNavigation className="pointer-events-auto md:hidden" />
      </div>
      <div className="flex justify-end md:flex-1">
        <div className="py-16">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};
