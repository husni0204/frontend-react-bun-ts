import { useMutation } from "@tanstack/react-query";
// import Endpoint from "../../services/endpoint";
import Api from "../../services/api";

interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = () => {
    // const inputUsername = (window.document.getElementById("username") as HTMLInputElement)?.value || "";
    // const inputPassword = (window.document.getElementById("password") as HTMLInputElement)?.value || "";
    // const authLogin = "Basic " + btoa(inputUsername + ":" + inputPassword);

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await Api.post("/api/login", data);
            return response.data;
            // const response = await Endpoint.post("/user/login", data, {
            //     headers: {
            //         // "Accept-Language": "string",
            //         Accept: "application/json",
            //         Authorization: authLogin,
            //     },
            // });

        },
    });
};
