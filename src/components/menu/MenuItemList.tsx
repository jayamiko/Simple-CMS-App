import React from "react";
import Button from "../buttons/Button";
import { Menu, MenuGroup, removeMenu } from "@/store/slices/menuSlice";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";

function MenuItemList({
  groupId,
  idx,
  item,
}: {
  groupId: string;
  idx: number;
  item: Menu;
}) {
  const dispatch = useAppDispatch();
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    s.menu.groups.find((x: MenuGroup) => x.id === groupId)
  );

  if (!group) return null;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ itemId: item.id, groupId: group.id })
    );
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <div
      className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-move"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="text-gray-400 font-semibold w-6 text-center">
        {idx + 1}
      </div>

      <div className="flex-1">
        <div className="font-medium text-gray-800">{item.title}</div>
        <div className="text-sm text-gray-500 truncate">{item.path}</div>
      </div>

      <Button
        onClick={() =>
          dispatch(removeMenu({ groupId: group.id, menuId: item.id }))
        }
        customClass="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 transition"
      >
        <FaTrash size={14} />
      </Button>
    </div>
  );
}

export default MenuItemList;
