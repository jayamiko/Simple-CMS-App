import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { camelCaseToTitle, toKebabCase } from "@/utils/helpers";

type FormFieldProps = {
  name: string;
  type: string;
  placeholder?: string;
  isRequired: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
};

function FormField({
  name,
  type,
  placeholder,
  isRequired,
  register,
  error,
  onKeyDown,
}: FormFieldProps) {
  const nameField: string = toKebabCase(name);

  return (
    <div>
      <label
        htmlFor={nameField}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {camelCaseToTitle(name)}
      </label>
      <input
        id={nameField}
        type={type}
        {...register}
        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        required={isRequired}
        onKeyDown={onKeyDown}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default FormField;
