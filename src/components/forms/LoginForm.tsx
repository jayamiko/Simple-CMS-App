import React, { useEffect } from "react";
import FormField from "../inputs/FormField";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import { RootState } from "@/store/store";
import { login } from "@/store/slices/authSlice";
import ErrorAlert from "../alerts";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginPayload } from "@/types/auth";
import { handleEnterSubmit } from "@/utils/helpers";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const router: AppRouterInstance = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, error } = useAppSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = (data: LoginPayload) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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
        onKeyDown={(e) => handleEnterSubmit(e, handleSubmit, onSubmit)}
      />
      <div className="flex items-center justify-center">
        <Button
          type="submit"
          customClass="w-full text-center py-2 px-4 rounded-lg font-semibold transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
