import { type FC, useState, useContext, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

interface ValidationErrors {
    [key: string]: string;
}

const Login: FC = () => {
    // initialize navigate
    const navigate = useNavigate();

    // initialize useRegister
    const { mutate, isPending } = useLogin();

    // destruct auth context "setIsAuthenticated"
    const { setIsAuthenticated } = useContext(AuthContext)!;

    // define state
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // call register mutation
        mutate(
            { username, password },
            {
                onSuccess: (data: any) => {
                    // set token to cookie
                    Cookies.set("token", data.data.token);

                    //set user to cookie
                    Cookies.set(
                        "user",
                        JSON.stringify({
                            id: data.data.user.id,
                            name: data.data.user.name,
                            username: data.data.user.username,
                            email: data.data.user.email,
                        }),
                    );
                    // Cookies.set(
                    //     "employee_info",
                    //     JSON.stringify({
                    //         id: data.data.user.id,
                    //         name: data.data.user.name,
                    //         work_email: data.data.user.work_email,
                    //         department: data.data.user.department,
                    //         department_id: data.data.user.department_id,
                    //     }),
                    // );

                    //set  isAuthenticated to true
                    setIsAuthenticated(true);

                    // redirect to dashboard page
                    navigate("/admin/dashboard");
                },
                onError: (error: any) => {
                    // get response data
                    const data = error.response.data;
                    // set errors to state "errors"
                    setErrors(data.errors || { _global: data.message || "Something went wrong" });
                },
            },
        );
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body">
                        <h4 className="fw-bold text-center">LOGIN</h4>
                        <hr />
                        {errors._global && <div className="alert alert-danger mt-2 rounded-4">Username or Password is incorrect</div>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Username</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                                {errors.username && <div className="alert alert-danger mt-2 rounded-4">{errors.username}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                {errors.password && <div className="alert alert-danger mt-2 rounded-4">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-4" disabled={isPending}>
                                {isPending ? "Loading..." : "LOGIN"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
