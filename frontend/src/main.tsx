import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AllRoutes from "./routes/AllRoutes";
import { ThemeContextProvider } from "./context/Theme/ThemeContext";
import { OpenContextProvider } from "./context/Open/OpenContext";
import { ReviewContextProvider } from "./context/Review/ReviewContext";
import { UserContextProvider } from "./context/User/UserContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserContextProvider>
      <ThemeContextProvider>
        <OpenContextProvider>
          <ReviewContextProvider>
            <AllRoutes />
          </ReviewContextProvider>
        </OpenContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
