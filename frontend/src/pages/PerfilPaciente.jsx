import { useEffect, useState } from "react";
import axios from "axios";
import PacienteLayout from "../layouts/PacienteLayout";

function PerfilPaciente() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({

        name: "",
        lastname: "",
        email: "",
        cellphone: "",
        birthdate: ""

    });

    useEffect(() => {

        obtenerPerfil();

    }, []);

    const obtenerPerfil = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/perfil-paciente/${user.user_id}`
            );

            setForm(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const guardarPerfil = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/perfil-paciente/${user.user_id}`,
                form
            );

            alert("Perfil actualizado");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <PacienteLayout>

            <h2 className="fw-bold mb-4">
                👤 Mi Perfil
            </h2>

            <div className="card shadow border-0">

                <div className="card-body">

                    <form
                        onSubmit={guardarPerfil}
                        className="row g-4"
                    >

                        <div className="col-md-6">

                            <label className="form-label">
                                Nombre
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Apellido
                            </label>

                            <input
                                type="text"
                                name="lastname"
                                value={form.lastname}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                name="cellphone"
                                value={form.cellphone}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Fecha nacimiento
                            </label>

                            <input
                                type="date"
                                name="birthdate"
                                value={form.birthdate || ""}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-12">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Guardar cambios
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </PacienteLayout>

    );

}

export default PerfilPaciente;