import { FormProps } from "../Form";
import { DefaultValues } from "react-hook-form";

export interface FormModalProps<T> extends FormProps<T>, ModalProps {
  title?: string;
  isGrid?: boolean;
  fields?: {
    typeComponent?: string;
    options?: Array<{ label: string; value: string | number }>;
    rows?: number | undefined;
    maxRows?: number | undefined;
    name?: keyof T;
    label?: string;
    type?: string;
    icon?: JSX.Element;
  }[];
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}
