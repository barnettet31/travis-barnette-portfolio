import clsx from "clsx";

export const Prose = ({ children, className }: { children: React.ReactNode , className:string;}) => {
    return (
        <div className={clsx(className, 'prose md:prose-xl lg:prose-2xl dark:prose-invert')}>
        {children}
        </div>
    );
    };
