import Cookies from "js-cookie";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

// interface User {
//     id: number;
//     name: string;
//     work_email: string;
//     department: string;
//     departmentt_id: number;
// }

export const useAuthUser = (): User | null => {
    // get user data from cookies
    const user = Cookies.get("user");

    // Jika ada data user, parse JSON dan kembalikan
    // Jika tidak ada, kembalikan null
    return user ? (JSON.parse(user) as User) : null;
};
