"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { ChildrenProps } from "./MainLayout";

export default function LayoutWrapper({ children }: ChildrenProps) {
  const pathname: string = usePathname();

  const hideNavbar: boolean = pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
