"use client";

import React from "react";
import MainLayout from "./MainLayout";
import { useAppSelector } from "@/hooks/hooks";
import Header from "../headers/Header";
import { FaArrowLeft, FaListAlt } from "react-icons/fa";
import { WelcomeCard } from "../cards/WelcomeCard";
import { RootState } from "@/store/store";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import { findMenuBySlug, findMenuGroupById } from "@/utils/helpers";
import { Menu, MenuGroup } from "@/types/menu";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePersistedUser } from "@/hooks/usePersistedUser";

type MenuLayoutProps = {
  slug: string;
};

const MenuLayout = ({ slug }: MenuLayoutProps) => {
  const router: AppRouterInstance = useRouter();

  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { groups, selectedGroupId } = useAppSelector(
    (state: RootState) => state.menu
  );

  usePersistedUser(isAuthenticated, user);

  const selectedGroup: MenuGroup | undefined = findMenuGroupById(
    groups,
    selectedGroupId
  );
  const matchedMenu: Menu | undefined = findMenuBySlug(
    selectedGroup?.menus,
    slug
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        {matchedMenu?.title && (
          <Header title={matchedMenu.title} icon={<FaListAlt />} />
        )}

        <Button
          variant="primary"
          onClick={() => router.back()}
          icon={<FaArrowLeft />}
        >
          Back
        </Button>
      </div>

      {isAuthenticated && user?.fullname && (
        <WelcomeCard
          name={user.fullname}
          description={`You are currently on the "${
            matchedMenu?.title ?? "Unknown"
          }" page inside the "${
            selectedGroup?.name ?? "Unknown"
          }" group. Use the navigation above to manage content and settings for this section.`}
        />
      )}
    </MainLayout>
  );
};

export default MenuLayout;
