import * as yup from "yup";

export const AtmFormSchema = yup.object().shape({
  atmNumber: yup.string().required(" Required"),
  holderName: yup.string().required(" Required"),
});

export type AtmFormype = yup.InferType<typeof AtmFormSchema>;
