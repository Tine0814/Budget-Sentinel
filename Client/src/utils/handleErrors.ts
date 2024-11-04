import { AxiosError } from "axios";

const handleErrors = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error("API Error:", error.response?.data || error.message);

    switch (error.response?.status) {
      case 400:
        alert(error.response?.data.error);
        break;
      case 401:
        alert(error.response?.data.error);
        break;
      default:
        alert(error.response?.data.error);
    }
  } else {
    console.error("Unexpected error:", error);
    console.log("An error occurred. Please try again.");
  }
};

export default handleErrors;
