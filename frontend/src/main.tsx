import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AllRoutes from "./routes/AllRoutes";
import { ThemeContextProvider } from "./context/Theme/ThemeContext";
import { OpenContextProvider } from "./context/Open/OpenContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <OpenContextProvider>
        <AllRoutes />
      </OpenContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);
