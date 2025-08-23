import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addMenu, MenuGroup, MenuPayload } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useForm } from "react-hook-form";
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

  const handleAddGroup = (data: MenuPayload) => {
    if (!data.title.trim() || !data.path.trim()) return;
    dispatch(
      addMenu({ groupId, title: data.title.trim(), path: data.path.trim() })
    );
    reset();
  };

  return (
    <form
      className="grid gap-3 sm:grid-cols-3"
      onSubmit={handleSubmit(handleAddGroup)}
    >
      <FormField
        name="title"
        type="text"
        placeholder="Enter Menu Title"
        isRequired
        register={register("title", {
          required: "Title is required",
        })}
        error={errors.title}
      />
      <FormField
        name="path"
        type="text"
        placeholder="Enter The Path"
        isRequired
        register={register("path", {
          required: "path is required",
        })}
        error={errors.path}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(handleAddGroup)();
          }
        }}
      />
      <div className="sm:col-span-1 flex items-end">
        <Button
          type="submit"
          icon={<FaPlus />}
          customClass="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Add Menu
        </Button>
      </div>
    </form>
  );
}

export default GroupMenuForm;
