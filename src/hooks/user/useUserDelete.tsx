import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api"
import Cookies from "js-cookie";

export const useUserDelete = () => {
    return useMutation({
        // mutation function untuk delete user
        mutationFn: async (id: number) => {
            // ambil token dari cookies
            const token = Cookies.get("token");

            // lakukan request delete ke endpoint API
            const response = await Api.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        }
    })
}