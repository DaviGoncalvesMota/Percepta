import { useContext } from "react";
import { UserContext } from "../context/User/UserContext";

export const Endpoint = () => {
  const { userRole } = useContext(UserContext);
  const endpoint = userRole === "employer" ? "employers" : "companies";
  return endpoint
};


