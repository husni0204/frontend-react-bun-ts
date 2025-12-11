import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

// interface user
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const useUsers = () => {
    return useQuery<User[], Error>({
        // query key
        queryKey: ["users"],

        // query function
        queryFn: async () => {
            // try ccatch block
            try {
                // get token froom cookies
                const token = Cookies.get("token");

                // get users from api
                const response = await Api.get("/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // return data
                return response.data.data as User[];
            } catch (error: any) {
                throw new Error(error.response?.data?.message || "Failed to fetch users");
            }
        },
    });
};
