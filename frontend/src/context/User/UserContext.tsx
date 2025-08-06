/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  );
};
