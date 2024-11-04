import React from "react";
import { MoleculeThemeToggleButton } from "@/components";

const PublicLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className=" h-screen dark:bg-black">
      <MoleculeThemeToggleButton />
      {children}
    </div>
  );
};

export default PublicLayout;
