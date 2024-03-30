import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-accent-foreground">
        Go back to the{" "}
        <Link to="/app/dashboard" className="text-accent-foreground underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
