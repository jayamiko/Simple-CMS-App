"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (pathname !== "/login") {
      if (!auth.isAuthenticated) {
        router.replace("/login");
      }
    }
  }, [auth.isAuthenticated, pathname, router]);

  return <>{children}</>;
}

export default AuthGuard;
