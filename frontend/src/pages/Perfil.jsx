import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function Perfil() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        cellphone: "",
        birthdate: ""
    });

    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            navigate("/");
            return;
        }

        setUserId(storedUser.user_id);

        obtenerPerfil(storedUser.user_id);

    }, []);

    /* OBTENER PERFIL */

    const obtenerPerfil = async (id) => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/perfil/${id}`
            );

            setUser(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    /* MANEJAR INPUT */

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    /* ACTUALIZAR PERFIL */

    const actualizarPerfil = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/actualizar-perfil/${userId}`,
                user
            );

            alert("Perfil actualizado correctamente");

            /* actualizar localStorage */

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...user,
                    user_id: userId,
                    user_type: "admin"
                })
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">
                    👤 Administrar Perfil
                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    Volver
                </button>

            </div>

            <div className="card shadow border-0" style={{ marginTop: "80px" }}>

                <div className="card-body">

                    <form onSubmit={actualizarPerfil}>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Apellido
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={user.lastname}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Teléfono
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="cellphone"
                                    value={user.cellphone || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Fecha de nacimiento
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="birthdate"
                                    value={user.birthdate || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-12 mt-4">

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Guardar cambios
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Perfil;