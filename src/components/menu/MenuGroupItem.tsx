import React from "react";
import { RootState } from "@/store/store";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { removeGroup, selectGroup } from "@/store/slices/menuSlice";
import Button from "../buttons/Button";
import { BiCheckCircle, BiPlayCircle } from "react-icons/bi";
import { findMenuGroupById } from "@/utils/helpers";
import { MenuGroup } from "@/types/menu";

type Props = {
  item: MenuGroup;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  children: React.ReactNode;
};

function MenuGroupItem({ item, expanded, setExpanded, children }: Props) {
  const dispatch = useAppDispatch();
  const selectedGroupId: string | null = useAppSelector(
    (s: RootState) => s.menu.selectedGroupId
  );

  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    findMenuGroupById(s.menu.groups, item.id)
  );

  if (!group) return null;

  const toggle = (id: string) =>
    setExpanded((p: Record<string, boolean>) => ({ ...p, [id]: !p[id] }));

  return (
    <li key={item.id} className="p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-medium">{item.name}</div>
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          {group?.menus?.length > 0 && (
            <Button
              onClick={() => dispatch(selectGroup(item.id))}
              customClass={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm cursor-pointer transition ${
                item.id === selectedGroupId
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {item.id === selectedGroupId ? (
                <>
                  <BiCheckCircle className="w-4 h-4" />
                  Used
                </>
              ) : (
                <>
                  <BiPlayCircle className="w-4 h-4" />
                  Use
                </>
              )}
            </Button>
          )}
          <Button
            onClick={() => toggle(item.id)}
            customClass="rounded-lg border px-3 py-1 text-xs sm:text-sm hover:bg-gray-50 cursor-pointer"
          >
            {expanded[item.id] ? (
              <span className="inline-flex items-center gap-1">
                <FaChevronUp /> Close
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <FaChevronDown /> View
              </span>
            )}
          </Button>
          <Button
            onClick={() => dispatch(removeGroup(item.id))}
            customClass="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs sm:text-sm text-white hover:bg-red-700 cursor-pointer"
          >
            <FaTrash />
          </Button>
        </div>
      </div>

      {children}
    </li>
  );
}

export default MenuGroupItem;
