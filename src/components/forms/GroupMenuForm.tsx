import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addMenu, MenuGroup, MenuPayload } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import React from "react";
import { FieldError, useForm } from "react-hook-form";
import FormField from "../inputs/FormField";
import Button from "../buttons/Button";
import { FaPlus } from "react-icons/fa";

function GroupMenuForm({ groupId }: { groupId: string }) {
  const dispatch = useAppDispatch();
  const group: MenuGroup | undefined = useAppSelector((s: RootState) =>
    s.menu.groups.find((x: MenuGroup) => x.id === groupId)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuPayload>();

  if (!group) return null;

  const isError: FieldError | undefined = errors.title || errors.path;

  const maxMenuReached: boolean = group.menus.length >= 5;

  const handleAddMenu = (data: MenuPayload) => {
    if (maxMenuReached) return;
    if (!data.title.trim() || !data.path.trim()) return;

    dispatch(
      addMenu({ groupId, title: data.title.trim(), path: data.path.trim() })
    );
    reset();
  };

  return (
    <form
      className="grid gap-3 sm:grid-cols-3"
      onSubmit={handleSubmit(handleAddMenu)}
    >
      <FormField
        name="title"
        type="text"
        placeholder="Enter Menu Title"
        isRequired
        register={register("title", {
          required: "Title is required",
          pattern: {
            value: /^[A-Z][a-z]+$/,
            message: "Title must start with uppercase and rest lowercase",
          },
        })}
        error={errors.title}
        disabled={maxMenuReached}
      />
      <FormField
        name="path"
        type="text"
        placeholder="/path/subpath"
        isRequired
        register={register("path", {
          required: "Path is required",
          pattern: {
            value: /^\/[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/,
            message: "Path must start with '/' and be in format /path/subpath",
          },
        })}
        error={errors.path}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(handleAddMenu)();
          }
        }}
        disabled={maxMenuReached}
      />
      <div
        className={`sm:col-span-1 flex ${
          isError ? "items-center" : "items-end"
        }`}
      >
        <Button
          type="submit"
          icon={<FaPlus />}
          disabled={maxMenuReached}
          customClass={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-white ${
            maxMenuReached
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {maxMenuReached ? "Max 5 Menus Reached" : "Add Menu"}
        </Button>
      </div>
    </form>
  );
}

export default GroupMenuForm;
