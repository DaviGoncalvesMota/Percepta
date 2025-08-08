/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

type UserContextType = {
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  userRole: "",
  setUserRole: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "employer" || savedRole === "company") {
      setUserRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (userRole === "employer" || userRole === "company") {
      localStorage.setItem("userRole", userRole);
    }
  }, [userRole]);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
