import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormType = yup.InferType<typeof LoginFormSchema>;
