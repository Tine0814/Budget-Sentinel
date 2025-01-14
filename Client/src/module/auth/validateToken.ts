import { makeAuthenticatedRequest } from "../api/apiHelpers";

interface ValidateTokenResponse {
  isValid: boolean;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export const validateToken =
  async (): Promise<ValidateTokenResponse | null> => {
    const { data, error } =
      await makeAuthenticatedRequest<ValidateTokenResponse>(
        "api/auth/validate-token"
      );

    if (error) {
      console.error("Token validation failed:", error);
      return null;
    }

    return data;
  };
