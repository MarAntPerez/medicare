import { useEffect, useState } from "react";
import axios from "axios";
import PacienteLayout from "../layouts/PacienteLayout";

function MisCitas() {

    const [citas, setCitas] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        obtenerCitas();

    }, []);

    const obtenerCitas = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/mis-citas/${user.user_id}`
            );

            setCitas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <PacienteLayout>

            <h2 className="fw-bold mb-4">
                📅 Mis Citas
            </h2>

            <div className="card shadow border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Estado</th>

                            </tr>

                        </thead>

                        <tbody>

                            {citas.map((cita) => (

                                <tr key={cita.appointment_id}>

                                    <td>
                                        {cita.appointment_id}
                                    </td>

                                    <td>
                                        {cita.date}
                                    </td>

                                    <td>
                                        {cita.hour}
                                    </td>

                                    <td>
                                        {cita.cause}
                                    </td>

                                    <td>

                                        <span className={`badge ${cita.status === "Confirmada"
                                                ? "bg-success"
                                                : cita.status === "Cancelada"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                            }`}>

                                            {cita.status}

                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </PacienteLayout>

    );

}

export default MisCitas;