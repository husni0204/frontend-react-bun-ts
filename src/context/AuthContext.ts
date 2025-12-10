import { createContext } from "react";

// menentukan tipe dari context value
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// membuat context dengan default value undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
