//################################################################################
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Loading } from "./Loading";
//################################################################################

//################################################################################
export const Login = () => {
    const { actions, loading } = useUser();
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({ email: "", password: "" });
    // const [loading, setLoading] = useState(false);

    const login = (e) => {
        e.preventDefault();
        actions(dataUser, navigate);
    };

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center">
                            <i className="fas fa-user fa-5x"></i>
                        </div>
                        <div className="card-header text-center mt-3">
                            <h4>INICIO DE SESIÓN</h4>
                        </div>

                        <div className="card-body">
                            {loading ? (
                                <Loading />
                            ) : (
                                <form onSubmit={login}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            autoFocus
                                            onChange={(e) => handleChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            onChange={(e) => handleChange(e)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="form-control btn btn-primary "
                                    >
                                        Login
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
//################################################################################
