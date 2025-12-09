import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";

interface LoginRequest {
  username: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await Api.post("/api/login", data);

      return response.data;
    },
  });
};

export default useLogin;
