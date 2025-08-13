import { useNavigate } from "react-router-dom";

const IA = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const isUserRoleTrue = localStorage.getItem("userRole");
  if (!isAuthenticated || !isUserRoleTrue) {
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
