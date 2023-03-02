const routeMap = new Map();
routeMap.set("/", "Home");
routeMap.set("/about", "About");
routeMap.set("/myProjects", "Projects");
routeMap.set("/blog", "Blog");

export const getCurrentPage = (pathname: string) =>
{
    if (routeMap.has(pathname))
    {
        return routeMap.get(pathname) as string;
    }
    else
    {
        return "Home";
    }
};