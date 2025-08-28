import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";

const IA = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Intelligent Assistant Page</h1>
      {/* IA content goes here */}
    </div>
  );
};

export default IA;
