// src/components/layouts/PrivateLayout.tsx

import React, { useState } from "react";
import {
  OrganismsATMCard,
  OrganismsNavBar,
  OrganismsSideBar,
} from "../organisms";
import { PrivateLayoutProps } from "@/core/types/Template/PrivateLayoutProps";
import { OrganismsAtmForm } from "../organisms";
import { useAuth } from "@/core/context";

const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  children,
  pageTitle,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideCardOpen, setSideCardOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleCard = () => {
    setSideCardOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-secondary-background-light dark:bg-secondary-background-dark transition-all duration-300">
      {/* modal for atm form
       */}
      <OrganismsAtmForm open={modalOpen} onClose={handleCloseModal} />
      <OrganismsSideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 pt-5 overflow-hidden 
             `}
      >
        <div className="p-4 h-full overflow-x-auto">
          <OrganismsNavBar
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            pageTitle={pageTitle}
            toggleCard={toggleCard}
          />
          {children}
        </div>
      </div>
      <OrganismsATMCard onClick={handleOpenModal} isOpenCard={sideCardOpen} />
    </div>
  );
};

export default PrivateLayout;
