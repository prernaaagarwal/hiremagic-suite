import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background grain px-6">
      <div className="text-center max-w-lg">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          § Folio missing
        </span>
        <h1 className="font-display text-[10rem] leading-none tracking-tight mt-4">
          4<span className="italic text-accent">0</span>4
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This page was never set in type.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-6 h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
        >
          Return to the studio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
