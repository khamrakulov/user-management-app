import axios from "axios";
import { User, ActionResponse } from "../types";

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
    `${API_URL}/block`,
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const unblockUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.post<ActionResponse>(
    `${API_URL}/unblock`,
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const deleteUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.delete<ActionResponse>(API_URL, {
    ...getAuthHeader(),
    data: { userIds },
  });
  return response.data;
};
