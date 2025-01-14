import { makeAuthenticatedRequest } from "../api/apiHelpers";
import { LoginResponse } from "./login";

export interface refreshTokenRequest {
  refreshToken: string;
}
export const useRefreshToken = async (
  data: refreshTokenRequest
): Promise<LoginResponse | null> => {
  try {
    const { data: responseData, error } =
      await makeAuthenticatedRequest<LoginResponse>(
        "api/auth/refresh-token",
        "POST",
        data
      );
    console.log("Request payload:", data);

    if (error) {
      console.error("Token Refresh failed:", error);
      return null;
    }

    return responseData;
  } catch (e) {
    console.error("Unexpected error during token refresh:", e);
    return null;
  }
};
