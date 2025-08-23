// MenuLayout.tsx
"use client";

import React from "react";
import MainLayout from "./MainLayout";
import { useAppSelector } from "@/hooks/hooks";

function MenuLayout({ slug }: { slug: string }) {
  const { groups, selectedGroupId } = useAppSelector((s) => s.menu);

  const matchedMenu = groups
    .find((g) => g.id === selectedGroupId)
    ?.menus.find((menu) => menu.path === slug);

  return (
    <MainLayout>
      <div>
        <h1>{matchedMenu?.title ?? "Not Found"}</h1>
      </div>
    </MainLayout>
  );
}

export default MenuLayout;
