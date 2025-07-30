/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

type OpenContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OpenContext = createContext<OpenContextType>({
  open: false,
  setOpen: () => {},
});

export const OpenContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
};