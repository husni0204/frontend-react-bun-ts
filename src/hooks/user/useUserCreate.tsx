import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

// interface user
export interface UserRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useUserCreate = () => {
    return useMutation({
        // mutation for creating user
        mutationFn: async (data: UserRequest) => {
            try {
                // get token froom cookies
                const token = Cookies.get("token");

                // get users from api
                const response = await Api.post("/api/users", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // return response data
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || "Failed to create users");
            }
        },
    });
};
