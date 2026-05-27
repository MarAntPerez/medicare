import { useEffect, useState } from "react";
import axios from "axios";
import PacienteLayout from "../layouts/PacienteLayout";

function MisPagos() {

    const [pagos, setPagos] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        obtenerPagos();

    }, []);

    const obtenerPagos = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/mis-pagos/${user.user_id}`
            );

            setPagos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <PacienteLayout>

            <h2 className="fw-bold mb-4">
                💳 Mis Pagos
            </h2>

            <div className="card shadow border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>
                                <th>Monto</th>
                                <th>Método</th>
                                <th>Fecha</th>
                                <th>Estado</th>

                            </tr>

                        </thead>

                        <tbody>

                            {pagos.map((pago) => (

                                <tr key={pago.payment_id}>

                                    <td>
                                        {pago.payment_id}
                                    </td>

                                    <td>
                                        ${pago.amount}
                                    </td>

                                    <td>
                                        {pago.payment_method}
                                    </td>

                                    <td>
                                        {pago.payment_date}
                                    </td>

                                    <td>

                                        <span className={`badge ${pago.status === "Pagado"
                                                ? "bg-success"
                                                : pago.status === "Cancelado"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                            }`}>

                                            {pago.status}

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

export default MisPagos;