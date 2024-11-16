import { makeAuthenticatedRequest } from "../api/apiHelpers"; // Assuming apiHelpers is the file with the utility

interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
  message: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: responseData, error } =
    await makeAuthenticatedRequest<LoginResponse>(
      "api/auth/login",
      "POST",
      data
    );
  if (error) {
    throw error;
  }
  return responseData;
};
