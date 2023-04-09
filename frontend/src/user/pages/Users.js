import React from "react";
import UsersList from "../components/UsersList";
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Bryan Guner",
      image:
        "https://d33wubrfki0l68.cloudfront.net/e5828552ff6b5743ed241d9c926e60eb925dde97/8dbbf/images/goals.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
