import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
} from "../services/userService";
import { User } from "../types";
import NavbarComponent from "./NavbarComponent";
import TableComponent from "./TableComponent";
import ToolbarComponent from "./ToolbarComponent";

const UserManagementComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleSelect = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedUserIds(checked ? users.map((user) => user.id) : []);
  };

  const handleBlock = async () => {
    if (selectedUserIds.length === 0) {
      toast.warn("No users selected");
      return;
    }
    try {
      const response = await blockUsers(selectedUserIds);
      toast.success(response.message);
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to block users");
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleUnblock = async () => {
    if (selectedUserIds.length === 0) {
      toast.warn("No users selected");
      return;
    }
    try {
      const response = await unblockUsers(selectedUserIds);
      toast.success(response.message);
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to unblock users");
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedUserIds.length === 0) {
      toast.warn("No users selected");
      return;
    }
    try {
      const response = await deleteUsers(selectedUserIds);
      toast.success(response.message);
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete users");
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarComponent />
      <div className="container mx-auto p-4">
        <ToolbarComponent
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          onDelete={handleDelete}
        />
        <TableComponent
          users={users}
          selectedUserIds={selectedUserIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};

export default UserManagementComponent;
