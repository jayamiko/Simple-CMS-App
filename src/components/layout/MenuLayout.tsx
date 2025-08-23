"use client";

import React, { useEffect } from "react";
import MainLayout from "./MainLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Header from "../headers/Header";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { WelcomeCard } from "../cards/WelcomeCard";
import { RootState } from "@/store/store";
import { me } from "@/store/slices/authSlice";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";

type MenuLayoutProps = {
  slug: string;
};

const MenuLayout = ({ slug }: MenuLayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { groups, selectedGroupId } = useAppSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    if (isAuthenticated && !user) {
      const persistedRoot = localStorage.getItem("persist:root");
      if (persistedRoot) {
        const parsedRoot = JSON.parse(persistedRoot);
        const auth = JSON.parse(parsedRoot.auth);
        if (auth?.user) dispatch(me(auth.user));
      }
    }
  }, [isAuthenticated, user, dispatch]);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);
  const matchedMenu = selectedGroup?.menus.find((menu) => menu.path === slug);

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        {matchedMenu?.title && (
          <Header title={matchedMenu.title} icon={<FaHome />} />
        )}

        <Button
          variant="info"
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
