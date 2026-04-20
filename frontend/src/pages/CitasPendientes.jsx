import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function CitasPendientes() {

    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            navigate("/");
            return;
        }

        obtenerCitas();

    }, []);

    /* OBTENER CITAS */

    const obtenerCitas = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/citas-pendientes"
            );

            setCitas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    /* CONFIRMAR */

    const confirmarCita = async (id) => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/confirmar-cita/${id}`
            );

            alert("Cita confirmada");

            obtenerCitas(); // 🔄 recargar tabla

        } catch (error) {

            console.error(error);

        }

    };

    /* CANCELAR */

    const cancelarCita = async (id) => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/cancelar-cita/${id}`
            );

            alert("Cita cancelada");

            obtenerCitas(); // 🔄 recargar tabla

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">
                    📅 Citas Pendientes
                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    Volver
                </button>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {citas.length > 0 ? (

                                citas.map((cita) => (

                                    <tr key={cita.appointment_id}>

                                        <td>{cita.appointment_id}</td>

                                        <td>
                                            {cita.name} {cita.lastname}
                                        </td>

                                        <td>{cita.date}</td>

                                        <td>{cita.hour}</td>

                                        <td>{cita.cause}</td>

                                        <td>

                                            <span className="badge bg-warning text-dark">
                                                {cita.status}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() =>
                                                        confirmarCita(cita.appointment_id)
                                                    }
                                                >
                                                    ✔ Confirmar
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        cancelarCita(cita.appointment_id)
                                                    }
                                                >
                                                    ✖ Cancelar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="7" className="text-center text-muted">

                                        No hay citas pendientes

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default CitasPendientes;