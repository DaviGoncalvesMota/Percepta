import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Feedback from "../pages/Feedback/Feedback";
import Dashboard from "../pages/Dashboard/Dashboard";
import Details from "../pages/Details/Details";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import IA from "../pages/IA/IA";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AllFeedbacks from "../pages/AllFeedbacks/AllFeedbacks";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/allfeedbacks" element={<AllFeedbacks />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ia" element={<IA />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
