import { type FC, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/auth/useRegister";

// interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const Register: FC = () => {
    // initialize navigate
    const navigate = useNavigate();

    // initialize useRegister
    const { mutate, isPending } = useRegister();

    // define state
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // handle form submit
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // call register mutation
        mutate(
            { name, username, email, password },
            {
                onSuccess: () => {
                    // redirect to login page
                    navigate("/login");
                },
                onError: (error: any) => {
                    // set errors to state "errors"
                    setErrors(error.response.data.errors);
                },
            },
        );
    };

    return (
        <div className="row justify-content-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold text-center">REGISTER</h4>
                            <hr />
                            <form onSubmit={handleRegister}>
                                {/*row user name*/}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Full Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Full Name" />
                                            {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Username</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                                            {errors.username && <div className="alert alert-danger">{errors.username}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/*row email*/}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Email Address</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email Address" />
                                            {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                            {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 rounded-4" disabled={isPending}>
                                    {isPending ? "loading..." : "REGISTER"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
