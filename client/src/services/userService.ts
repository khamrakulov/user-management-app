import axios from "axios";
import { User, ActionResponse } from "../types";

// Dynamically determine the API base URL from environment variables.
// For Vite, environment variables are accessed via import.meta.env and must be prefixed with VITE_APP_ (by default).
// The || "http://localhost:5062" provides a fallback for local development outside Docker.
const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5062";

// This remains the specific path for user-related endpoints
const USERS_API_PATH = "/api/users";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_API_URL}${USERS_API_PATH}`, getAuthHeader());
  return response.data;
};

export const blockUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.post<ActionResponse>(
    `${BASE_API_URL}${USERS_API_PATH}/block`, // Combine base URL with path
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const unblockUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.post<ActionResponse>(
    `${BASE_API_URL}${USERS_API_PATH}/unblock`, // Combine base URL with path
    { userIds },
    getAuthHeader()
  );
  return response.data;
};

export const deleteUsers = async (
  userIds: number[]
): Promise<ActionResponse> => {
  const response = await axios.delete<ActionResponse>(`${BASE_API_URL}${USERS_API_PATH}`, { // Combine base URL with path
    ...getAuthHeader(),
    data: { userIds },
  });
  return response.data;
};


// import axios from "axios";
// import { User, ActionResponse } from "../types";

// const API_URL = "/api/users";

// const getAuthHeader = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export const getUsers = async (): Promise<User[]> => {
//   const response = await axios.get<User[]>(API_URL, getAuthHeader());
//   return response.data;
// };

// export const blockUsers = async (
//   userIds: number[]
// ): Promise<ActionResponse> => {
//   const response = await axios.post<ActionResponse>(
//     `${API_URL}/block`,
//     { userIds },
//     getAuthHeader()
//   );
//   return response.data;
// };

// export const unblockUsers = async (
//   userIds: number[]
// ): Promise<ActionResponse> => {
//   const response = await axios.post<ActionResponse>(
//     `${API_URL}/unblock`,
//     { userIds },
//     getAuthHeader()
//   );
//   return response.data;
// };

// export const deleteUsers = async (
//   userIds: number[]
// ): Promise<ActionResponse> => {
//   const response = await axios.delete<ActionResponse>(API_URL, {
//     ...getAuthHeader(),
//     data: { userIds },
//   });
//   return response.data;
// };
