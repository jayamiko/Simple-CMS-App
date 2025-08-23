import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { Menu, MenuGroup, reorderMenu } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import GroupMenuForm from "../forms/GroupMenuForm";
import MenuItemList from "./MenuItemList";
import { FaInfo } from "react-icons/fa";

function GroupMenus({ groupId }: { groupId: string }) {
  const dispatch = useAppDispatch();
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    s.menu.groups.find((x: MenuGroup) => x.id === groupId)
  );

  const [draggingId, setDraggingId] = useState<string | null>(null);

  if (!group) return null;

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    const fromIndex = group.menus.findIndex((m) => m.id === draggingId);
    const toIndex = group.menus.findIndex((m) => m.id === targetId);

    dispatch(reorderMenu({ groupId, fromIndex, toIndex }));
    setDraggingId(null);
  };

  return (
    <div className="mt-4 rounded-xl border bg-gray-50 p-4">
      <GroupMenuForm groupId={groupId} />

      <ul className="mt-4 rounded-xl bg-white space-y-1">
        <i className="text-xs text-gray-700 flex">
          <FaInfo /> You can change the menu order by dragging the menu.
        </i>
        {group.menus.length === 0 && (
          <li className="p-4 text-sm text-gray-500">Belum ada menu</li>
        )}
        {group.menus.map((m: Menu, index: number) => (
          <li
            key={m.id}
            draggable
            onDragStart={(e) => handleDragStart(e, m.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, m.id)}
            className={`transition-colors rounded-lg ${
              draggingId === m.id ? "bg-gray-200" : "bg-white"
            }`}
          >
            <MenuItemList groupId={groupId} idx={index} item={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupMenus;
