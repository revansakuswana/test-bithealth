import { createContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

export type User = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/auth/profile`,
          {
            credentials: "include",
          }
        );

        const result = await res.json();
        if (res.ok && result.success) {
          setUser(result.data);
          console.log(result.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const contextValue = useMemo(
    () => ({ user, setUser, loading }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
