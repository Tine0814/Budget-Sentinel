import React, { useEffect, useState } from "react";
import OverviewSection from "./OverviewSection";
import { getUsers } from "@/module/services/user/getUser";

interface User {
  id: number;
  username: string;
  role: string;
}

const DashboardBlock = () => {
  // const [users, setUsers] = useState<User[] | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  return (
    <>
      <OverviewSection />
      {/* <div>
        <h1>User List</h1>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>Username:</strong> {user.username} <br />
                <strong>Email:</strong> {user.role}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div> */}
    </>
  );
};

export default DashboardBlock;
