import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponents";
import RegisterComponent from "./components/RegisterComponent";
import UserManagementComponent from "./components/UserManagementComponent";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/users" element={<UserManagementComponent />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
