import React, { useEffect } from "react";
import OverviewSection from "./OverviewSection";
import LatestTransactionSection from "./LatestTransactionSection";
import { useLoading } from "@/core/hooks";
import Skeleton from "@mui/material/Skeleton"; // Assuming Skeleton is imported correctly from MUI

const DashboardBlock = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const userData = await getUsers();
  //     if (userData) {
  //       setUsers(userData);
  //       setError(null);
  //     } else {
  //       setError("Failed to fetch users");
  //     }
  //     setLoading(false);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="mb-5 grid grid-cols-1 gap-4 items-center md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton variant="rectangular" width="100%" height={150} />
              </div>
            ))}
          </div>
          <Skeleton variant="rectangular" width="100%" height={290} />
        </>
      ) : (
        <>
          <OverviewSection />
          <LatestTransactionSection />
        </>
      )}
    </>
  );
};

export default DashboardBlock;
