import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import type { UserContextType } from "@/context/UserContext";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser harus digunakan di dalam UserProvider");
  return context;
};
