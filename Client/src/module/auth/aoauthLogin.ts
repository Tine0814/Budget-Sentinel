import { makeAuthenticatedRequest } from "../api/apiHelpers";
import { LoginResponse } from "./login";

export const oAuthLogin = async (): Promise<LoginResponse | null> => {
  const { data, error } = await makeAuthenticatedRequest<LoginResponse>(
    "api/auth/oauth2/login-success",
    "GET"
  );
  if (error) {
    console.error(`Fetching users failed: ${error}`);
    return null;
  }
  return data;
};
