import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oops, something went wrong!</h1>
      <p className="text-accent-foreground">An error occurred, more details:</p>
      <pre>{error?.message || JSON.stringify(error) || "Unknown error"}</pre>
      <p className="text-accent-foreground">
        Go back to the{" "}
        <Link to="/app/dashboard" className="text-accent-foreground underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
