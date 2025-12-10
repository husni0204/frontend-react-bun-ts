import Cookies from "js-cookie";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const useAuthUser = (): User | null => {
    // get user data from cookies
    const user = Cookies.get("user");

    // Jika ada data user, parse JSON dan kembalikan
    // Jika tidak ada, kembalikan null
    return user ? (JSON.parse(user) as User) : null;
};

export default useAuthUser;
