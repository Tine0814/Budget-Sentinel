import { useExecuteToast } from "@/core/context";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OrganismsFormModal from "./OrganismsFormModal";
import { AtmFormSchema, AtmFormype } from "@/core/Schema";
import { useLoading } from "@/core/hooks";
import { ModalProps } from "@/core/types";
import { FaCreditCard } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

export default function OrganismsAtmForm(props: ModalProps) {
  const { control, handleSubmit, reset } = useForm<AtmFormype>({
    resolver: yupResolver(AtmFormSchema),
  });

  const handleOnClose = props.onClose || (() => {});

  const { isLoading, startLoading, stopLoading } = useLoading();
  const toast = useExecuteToast();

  const onSubmit: SubmitHandler<AtmFormype> = async (data) => {
    startLoading();
    console.log(data);

    // try {
    //   const response = await createTicketHeader(data);
    //   const successMessage = response?.message || "Ticket created successfully";
    //   toast.executeToast(successMessage, "top-center", true, {
    //     type: "success",
    //   });
    //   reset();
    // } catch (error: any) {
    //   toast.executeToast(errorHandler(error), "top-center", true, {
    //     type: "error",
    //   });
    //   console.log("This", error);
    // } finally {
    //   stopLoading();
    //   handleCloseModal();
    // }
  };
  return (
    <div>
      <OrganismsFormModal<AtmFormype>
        open={props.open}
        onClose={props.onClose}
        title="Add Atm Card"
        fields={[
          //   {
          //     name: "category_id",
          //     label: "Category",
          //     typeComponent: "select",
          //     options: [
          //       { label: "Bug", value: "1" },
          //       { label: "Feature Request", value: "2" },
          //       { label: "Support", value: "3" },
          //     ],
          //   },
          {
            name: "atmNumber",
            label: "ATM Number",
            icon: <FaCreditCard />,
          },
          {
            name: "holderName",
            label: "Holder Name",
            icon: <IoPersonOutline />,
          },
        ]}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isGrid={false}
      />
    </div>
  );
}
