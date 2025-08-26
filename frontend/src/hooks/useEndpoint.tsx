import { useContext } from "react";
import { UserContext } from "../context/User/UserContext";

export const useEndpoint = (): string => {
  const { userRole } = useContext(UserContext);
  return userRole === "employer" ? "/employers" : "/companies";
};
