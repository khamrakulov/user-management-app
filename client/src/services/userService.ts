import axios from "axios";
import { User, ActionResponse } from "../types";

// Change this to a relative path. Vite's proxy will handle forwarding to the backend.
// The browser will prepend its own origin (e.g., http://localhost:3001) to this.
const API_URL = "/api/users";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL, getAuthHeader());
  return response.data;
};

export const blockUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.post<ActionResponse>(
    `${API_URL}/block`, // This will become e.g., http://localhost:3001/api/users/block
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const unblockUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.post<ActionResponse>(
    `${API_URL}/unblock`, // This will become e.g., http://localhost:3001/api/users/unblock
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const deleteUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.delete<ActionResponse>(API_URL, {
    // This will become e.g., http://localhost:3001/api/users
    ...getAuthHeader(),
    data: { userIds },
  });
  return response.data;
};