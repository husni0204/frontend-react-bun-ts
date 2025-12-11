import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import { AuthContext } from "../../context/AuthContext";

export const useLogout = () => {
    // ambil setIsAuthenticated dari context
    const authContext = useContext(AuthContext);

    // gunakan null assertion karena kita yakin Authcontext akan selalu tersedia
    const { setIsAuthenticated } = authContext!;

    // inisialisasi navigate
    const navigate = useNavigate();

    // fungsi logout
    const logout = () => {
        // hapus token dan user dari cookie
        Cookies.remove("token");
        Cookies.remove("user");

        // ubah status autentikasi menjadi false
        setIsAuthenticated(false);

        // arahkan ke halaman login
        navigate("/login");
    };

    return logout;
};
