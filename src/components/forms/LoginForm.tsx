import React from "react";
import FormField from "../inputs/FormField";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import { RootState } from "@/store/store";
import { login } from "@/store/slices/authSlice";
import { User } from "@/data/auth";
import ErrorAlert from "../alerts";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  const onSubmit = (data: User) => {
    dispatch(login(data));
    if (isAuthenticated) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <ErrorAlert text={error} />}
      <FormField
        name="email"
        type="email"
        placeholder="johndoe@mail.com"
        isRequired
        register={register("email", { required: "Email is required" })}
        error={errors.email}
      />

      <FormField
        name="password"
        type="password"
        placeholder="********"
        isRequired
        register={register("password", { required: "Password is required" })}
        error={errors.password}
      />

      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;
