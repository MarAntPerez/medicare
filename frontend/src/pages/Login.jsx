import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.jpeg";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("RESPUESTA:", response.data);

            alert("Login exitoso");

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            window.location.href = "/dashboard";

        } catch (error) {

            console.log("ERROR:", error.response);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Error de conexión con el servidor");
            }

        }

    };

    return (

        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                {/* LOGO */}
                <img
                    src={logo}
                    alt="Medicare Logo"
                    style={{
                        width: "200px",
                        margin: "0 auto 15px auto"
                    }}
                />

                <h3 className="text-center mb-4">
                    Iniciar Sesión
                </h3>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Ingresar
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Login;