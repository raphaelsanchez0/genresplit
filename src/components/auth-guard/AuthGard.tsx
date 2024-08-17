import { createAuthURL } from "@/utils/authURLHelper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingCard from "../loading-card/LoadingCard";
import { localStorageKeys } from "@/utils/constants";

interface AuthGardProps {
  children: React.ReactNode;
}

export default function AuthGard({ children }: AuthGardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeys.SPOTIFY_TOKEN);

    if (!token) {
      window.location.href = createAuthURL();
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="page">
        <LoadingCard />
      </div>
    );
  }
  return <>{children}</>;
}
