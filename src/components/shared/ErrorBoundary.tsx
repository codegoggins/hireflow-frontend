import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-main-black mb-2">
          Something went wrong
        </h2>
        <p className="text-dark-gray text-sm">
          Please try refreshing the page.
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
