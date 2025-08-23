import React from "react";
import GroupForm from "../forms/GroupForm";
import MenuGroupList from "../menu/MenuGroupList";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";
import { MenuGroup } from "@/store/slices/menuSlice";

function GroupManagement() {
  const groups: MenuGroup[] = useAppSelector((s: RootState) => s.menu.groups);

  return (
    <section className="rounded-2xl border p-4 sm:p-6 shadow-sm">
      <GroupForm />

      {groups?.length > 0 && <MenuGroupList groups={groups} />}
    </section>
  );
}

export default GroupManagement;
