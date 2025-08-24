import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { reorderMenu } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import GroupMenuForm from "../forms/GroupMenuForm";
import MenuItemList from "./MenuItemList";
import { FaInfo } from "react-icons/fa";
import { findMenuGroupById, findMenuIndexes } from "@/utils/helpers";
import { Menu, MenuGroup } from "@/types/menu";

type Props = { groupId: string };

function GroupMenus({ groupId }: Props) {
  const dispatch = useAppDispatch();
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    findMenuGroupById(s.menu.groups, groupId)
  );

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  if (!group) return null;

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    const { fromIndex, toIndex } = findMenuIndexes(
      group.menus,
      draggingId,
      targetId
    );

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
            onDragOver={handleDragOver}
            onDragStart={(e: React.DragEvent<HTMLLIElement>) =>
              handleDragStart(e, m.id)
            }
            onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e, m.id)}
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
