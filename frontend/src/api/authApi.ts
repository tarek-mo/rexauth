import axios from "axios";
import User from "../types/User";

const USERS_URL = "/api/users";
type LoginParams = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginParams) => {
  const response = await axios.post(`${USERS_URL}/auth`, credentials);
  return response.data as User;
};

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export const register = async (credentials: RegisterParams) => {
  const response = await axios.post(`${USERS_URL}`, credentials);
  return response.data as User;
};

export const logout = async () => {
  const response = await axios.post(`${USERS_URL}/logout`);
  return response.data;
};

type UpdateProfileParams = {
  name?: string;
  email?: string;
  password?: string;
};

export const updateProfile = async (userInfo: UpdateProfileParams) => {
  const response = await axios.put(`${USERS_URL}/profile`, userInfo);
  return response.data as User;
};
