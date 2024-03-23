import { isAxiosError } from "axios";
import { ErrorResponse } from "../types/ErrorResponse";

export const getErrorMessage = (error: unknown) => {
  let errorMessage = "";
  if (isAxiosError(error)) {
    errorMessage = (error.response?.data as ErrorResponse).message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred";
  }

  return errorMessage;
};
