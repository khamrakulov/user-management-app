import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">User Management</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
