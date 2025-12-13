import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router";

import Home from "../views/home";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Dashboard from "../views/admin/dashboard";
import UsersIndex from "../views/admin/users";
import UserCreate from "../views/admin/users/create.tsx";
import UserEdit from "../views/admin/users/edit.tsx";

export default function AppRoutes() {
    // menggunakan useContext untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // menggunakan optional chaining untuk mengindari error jika auth tidak ada
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />} />

            {/* route "/login" */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />} />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />

            {/* Tambahkan rute 404 Not Found di bagian paling bawah */}
            {/* <Route path="*" element={<div>404 - Halaman Tidak Ditemukan</div>} /> */}
            <Route path="*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />

            {/*route "/admmin/users*/}
            <Route path="/admin/users" element={isAuthenticated ? <UsersIndex/> : <Navigate to="/login" replace /> }/>

            {/*route "/admmin/users/create*/}
            <Route path="/admin/users/create" element={isAuthenticated ? <UserCreate/> : <Navigate to="/login" replace /> }/>

            {/* route "/admin/users/edit/:id" */}
            <Route path="/admin/users/edit/:id" element={isAuthenticated ? <UserEdit/> : <Navigate to="/login" replace /> } />
        </Routes>
    );
}
