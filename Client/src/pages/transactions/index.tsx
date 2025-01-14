import { PrivateLayout } from "@/components";
import React from "react";

export default function index() {
  return (
    <div>
      <div>Transaction</div>
    </div>
  );
}

index.isPrivate = true;
index.getLayout = function getLayout(page: React.ReactElement) {
  return <PrivateLayout pageTitle="Transactions">{page}</PrivateLayout>;
};
