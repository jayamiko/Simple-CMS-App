import React from "react";
import Button from "../buttons/Button";
import { Menu, MenuGroup, removeMenu } from "@/store/slices/menuSlice";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store/store";

function MenuItemList({ groupId, item }: { groupId: string; item: Menu }) {
  const dispatch = useAppDispatch();
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    s.menu.groups.find((x: MenuGroup) => x.id === groupId)
  );

  if (!group) return null;

  return (
    <li key={item.id} className="flex items-center justify-between p-3">
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-500">{item.path}</div>
      </div>
      <Button
        onClick={() =>
          dispatch(removeMenu({ groupId: group.id, menuId: item.id }))
        }
        customClass="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
      >
        <FaTrash />
      </Button>
    </li>
  );
}

export default MenuItemList;
