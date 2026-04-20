import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import PagoModal from "../components/PagosModal";

function Pagos() {

    const [pagos, setPagos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [pagoEditando, setPagoEditando] = useState(null);

    useEffect(() => {

        obtenerPagos();

    }, []);

    const obtenerPagos = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/pagos"
            );

            setPagos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const pagosFiltrados = pagos.filter(p =>
        p.patient_name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const guardarPago = async (data) => {

        try {

            if (pagoEditando) {

                await axios.put(
                    `http://127.0.0.1:8000/api/pagos/${pagoEditando.id}`,
                    data
                );

            } else {

                await axios.post(
                    "http://127.0.0.1:8000/api/pagos",
                    data
                );

            }

            setModalOpen(false);
            obtenerPagos();

        } catch (error) {

            console.error(error);

        }

    };

    const eliminarPago = async (id) => {

        if (!confirm("¿Eliminar pago?")) return;

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/pagos/${id}`
            );

            obtenerPagos();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-700">
                    💳 Pagos
                </h2>

                <input
                    type="text"
                    className="input-style w-80"
                    placeholder="Buscar paciente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

            </div>

            {/* TABLA */}

            <div className="card shadow border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>
                                <th>Paciente</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Método</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {pagosFiltrados.length > 0 ? (

                                pagosFiltrados.map((p) => (

                                    <tr key={p.id}>

                                        <td>{p.id}</td>

                                        <td>
                                            {p.patient_name}
                                        </td>

                                        <td>
                                            ${p.amount}
                                        </td>

                                        <td>
                                            {p.date}
                                        </td>

                                        <td>
                                            {p.method}
                                        </td>

                                        <td className="flex gap-2">

                                            <button
                                                onClick={() => {
                                                    setPagoEditando(p);
                                                    setModalOpen(true);
                                                }}
                                                className="btn btn-warning btn-sm"
                                            >
                                                ✏
                                            </button>

                                            <button
                                                onClick={() =>
                                                    eliminarPago(p.id)
                                                }
                                                className="btn btn-danger btn-sm"
                                            >
                                                🗑
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6" className="text-center">

                                        No hay pagos registrados

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                    <button
                        onClick={() => {
                            setPagoEditando(null);
                            setModalOpen(true);
                        }}
                        className="btn btn-primary mt-3"
                    >
                        + Nuevo pago
                    </button>

                </div>

            </div>

            {/* MODAL */}

            <PagoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={guardarPago}
                pago={pagoEditando}
            />

        </AdminLayout>

    );

}

export default Pagos;