import React from "react";
import LoginForm from "./LoginForm";
import { LoginFormSchema, LoginFormType } from "@/core/Schema";
import { useLoading } from "@/core/hooks/useLoading";
import { useExecuteToast } from "@/core/context";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/core/context/AuthContext";
import { useKeyDown } from "@/core/hooks/useKeyDown";

export default function LoginFormBlock() {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: yupResolver(LoginFormSchema),
  });

  const toast = useExecuteToast();

  const { loginUser } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    startLoading();

    try {
      const response = await loginUser(data.email, data.password);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    } catch (error: any) {
      toast.executeToast(
        error?.response?.data?.error || "An unexpected error occurred",
        "top-center",
        true,
        {
          type: "error",
        }
      );
    } finally {
      stopLoading();
    }
  };

  useKeyDown("Enter", () => handleSubmit(onSubmit)());
  return (
    <LoginForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}