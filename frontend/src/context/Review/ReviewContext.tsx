/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

type ReviewContextType = {
  revieweeName: string | "";
  revieweeId: string | "";
  revieweeAvatar: string | "";
  setRevieweeName: React.Dispatch<React.SetStateAction<string>>;
  setRevieweeId: React.Dispatch<React.SetStateAction<string>>;
  setRevieweeAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export const ReviewContext = createContext<ReviewContextType>({
  revieweeName: "",
  revieweeId: "",
  revieweeAvatar: "",
  setRevieweeName: () => {},
  setRevieweeId: () => {},
  setRevieweeAvatar: () => {}
});

export const ReviewContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [revieweeName, setRevieweeName] = useState<string | "">("");
  const [revieweeId, setRevieweeId] = useState<string | "">("")
  const [revieweeAvatar, setRevieweeAvatar] = useState<string | "">("")

  return (
    <ReviewContext.Provider value={{ revieweeName, revieweeId, revieweeAvatar, setRevieweeName, setRevieweeId, setRevieweeAvatar }}>
      {children}
    </ReviewContext.Provider>
  );
};
