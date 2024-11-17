import { makeAuthenticatedRequest } from "../api/apiHelpers";
import { refreshTokenRequest } from "./refreshToken";

export const logout = async (data: refreshTokenRequest): Promise<boolean> => {
  const { data: dataResponse, error } = await makeAuthenticatedRequest<{
    isValid: boolean;
  }>("api/auth/logout", "POST", data);
  if (error) {
    console.error("Logout failed:", error);
    return false;
  }
  return dataResponse.isValid;
};
