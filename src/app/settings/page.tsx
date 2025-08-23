"use client";
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  addGroup,
  removeGroup,
  addMenu,
  removeMenu,
  selectGroup,
} from "@/store/slices/menuSlice";
import {
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaCog,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { v4 as uuidv4 } from "uuid";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((s) => s.menu.groups);
  const selectedGroupId = useAppSelector((s) => s.menu.selectedGroupId);

  const [newGroup, setNewGroup] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const handleAddGroup = () => {
    const name = newGroup.trim();
    if (!name) return;
    dispatch(addGroup({ id: uuidv4(), name }));
    setNewGroup("");
  };

  return (
    <MainLayout>
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaCog /> Settings
        </h1>
      </header>

      {/* Group Management */}
      <section className="rounded-2xl border p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-600">Name Group</label>
            <input
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="Enter Group Name"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              onClick={handleAddGroup}
              className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-semibold cursor-pointer"
            >
              <FaPlus /> Add Group
            </button>
          </div>
        </div>

        <ul className="mt-4 divide-y rounded-xl border">
          {groups.map((g) => (
            <li key={g.id} className="p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-medium">{g.name}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(selectGroup(g.id))}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      g.id === selectedGroupId
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {g.id === selectedGroupId ? "Used" : "Use"}
                  </button>
                  <button
                    onClick={() => toggle(g.id)}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    {expanded[g.id] ? (
                      <span className="inline-flex items-center gap-1">
                        <FaChevronUp /> Close
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <FaChevronDown /> View
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => dispatch(removeGroup(g.id))}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {expanded[g.id] && <GroupMenus groupId={g.id} />}
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}

function GroupMenus({ groupId }: { groupId: string }) {
  const dispatch = useAppDispatch();
  const group = useAppSelector((s) =>
    s.menu.groups.find((x) => x.id === groupId)
  );

  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");

  if (!group) return null;

  const handleAddMenu = () => {
    if (!title.trim() || !path.trim()) return;
    dispatch(addMenu({ groupId, title: title.trim(), path: path.trim() }));
    setTitle("");
    setPath("");
  };
  return (
    <div className="mt-4 rounded-xl border bg-gray-50 p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Menu Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mis. Users"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Path</label>
          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Mis. /users"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:col-span-1 flex items-end">
          <button
            onClick={handleAddMenu}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            <FaPlus /> Add Menu
          </button>
        </div>
      </div>

      <ul className="mt-4 divide-y rounded-xl border bg-white">
        {group.menus.length === 0 && (
          <li className="p-4 text-sm text-gray-500">Belum ada menu</li>
        )}
        {group.menus.map((m) => (
          <li key={m.id} className="flex items-center justify-between p-3">
            <div>
              <div className="font-medium">{m.title}</div>
              <div className="text-sm text-gray-500">{m.path}</div>
            </div>
            <button
              onClick={() =>
                dispatch(removeMenu({ groupId: group.id, menuId: m.id }))
              }
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
