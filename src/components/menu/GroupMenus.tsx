import React from "react";
import { useAppSelector } from "@/hooks/hooks";
import { Menu, MenuGroup } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import GroupMenuForm from "../forms/GroupMenuForm";
import MenuItemList from "./MenuItemList";

function GroupMenus({ groupId }: { groupId: string }) {
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    s.menu.groups.find((x: MenuGroup) => x.id === groupId)
  );

  if (!group) return null;

  return (
    <div className="mt-4 rounded-xl border bg-gray-50 p-4">
      <GroupMenuForm groupId={groupId} />

      <ul className="mt-4 divide-y rounded-xl border bg-white">
        {group.menus.length === 0 && (
          <li className="p-4 text-sm text-gray-500">Belum ada menu</li>
        )}
        {group.menus.map((m: Menu, index: number) => (
          <MenuItemList key={index} groupId={groupId} item={m} />
        ))}
      </ul>
    </div>
  );
}

export default GroupMenus;
