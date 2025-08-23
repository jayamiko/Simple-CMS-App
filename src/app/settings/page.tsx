"use client";
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/headers/Header";
import GroupManagement from "@/components/sections/GroupManagement";
import { FaCog } from "react-icons/fa";

export default function SettingsPage() {
  return (
    <MainLayout>
      <Header title="Settings" icon={<FaCog />} />

      <GroupManagement />
    </MainLayout>
  );
}
