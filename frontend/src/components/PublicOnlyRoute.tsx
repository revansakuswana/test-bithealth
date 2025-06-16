import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { Progress } from "@/components/ui/progress";

export default function PublicOnlyRoute() {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <Progress className="w-full max-w-sm" value={66} />
      </div>
    );

  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
