import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function HistorialCitas() {

    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            navigate("/");
            return;
        }

        obtenerHistorial();

    }, []);

    /* OBTENER HISTORIAL */

    const obtenerHistorial = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/historial-citas"
            );

            setCitas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    /* BADGE SEGÚN ESTADO */

    const obtenerBadge = (estado) => {

        if (estado === "Confirmada") {
            return "bg-success";
        }

        if (estado === "Cancelada") {
            return "bg-danger";
        }

        return "bg-secondary";

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">
                    📜 Historial de Citas
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

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Estado</th>

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

                                            <span className={`badge ${obtenerBadge(cita.status)}`}>
                                                {cita.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6" className="text-center text-muted">

                                        No hay historial de citas

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

export default HistorialCitas;