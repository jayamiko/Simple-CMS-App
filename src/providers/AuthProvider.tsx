"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthState } from "@/types/auth";
import { ChildrenProps } from "@/components/layout/MainLayout";

function AuthGuard({ children }: ChildrenProps) {
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();
  const auth: AuthState = useAppSelector((state: RootState) => state.auth);

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
