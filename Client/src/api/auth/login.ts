import apiClient from "../apiClient";
import handleErrors from "@/utils/handleErrors";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("api/login", data);

    return response.data;
  } catch (error) {
    // handleErrors(error);
    throw error;
  }
};
