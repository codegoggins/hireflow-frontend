import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true;

const ProtectedRouter = () => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p className="text-dark-gray text-sm">Loading...</p>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default ProtectedRouter;
