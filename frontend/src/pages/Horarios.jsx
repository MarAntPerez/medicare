import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";
import HorarioModal from "../components/HorarioModal";

function Horarios() {

    const [horarios, setHorarios] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [horarioEditando, setHorarioEditando] = useState(null);

    useEffect(() => {

        obtenerHorarios();

    }, []);

    const obtenerHorarios = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/horarios"
            );

            setHorarios(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const horariosFiltrados = horarios.filter(h =>
        h.date.includes(busqueda)
    );

    const guardarHorario = async (data) => {

        try {

            if (horarioEditando) {

                await axios.put(
                    `http://127.0.0.1:8000/api/horarios/${horarioEditando.schedule_id}`,
                    data
                );

            } else {

                await axios.post(
                    "http://127.0.0.1:8000/api/horarios",
                    data
                );

            }

            setModalOpen(false);

            setHorarioEditando(null);

            obtenerHorarios();

        } catch (error) {

            console.error(error);

        }

    };

    const eliminarHorario = async (id) => {

        if (!confirm("¿Eliminar horario?")) return;

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/horarios/${id}`
            );

            obtenerHorarios();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-700">
                    ⏰ Horarios
                </h2>

                <input
                    type="text"
                    className="input-style w-80"
                    placeholder="Buscar fecha..."
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
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Disponible</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {horariosFiltrados.length > 0 ? (

                                horariosFiltrados.map((h) => (

                                    <tr key={h.schedule_id}>

                                        <td>{h.schedule_id}</td>

                                        <td>{h.date}</td>

                                        <td>{h.hour}</td>

                                        <td>

                                            {h.vacant ? (

                                                <span className="badge bg-success">
                                                    Disponible
                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">
                                                    Ocupado
                                                </span>

                                            )}

                                        </td>

                                        <td className="flex gap-2">

                                            <button
                                                onClick={() => {
                                                    setHorarioEditando(h);
                                                    setModalOpen(true);
                                                }}
                                                className="btn btn-warning btn-sm"
                                            >
                                                ✏
                                            </button>

                                            <button
                                                onClick={() =>
                                                    eliminarHorario(h.schedule_id)
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

                                    <td colSpan="5" className="text-center">

                                        No hay horarios registrados

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                    <button
                        onClick={() => {
                            setHorarioEditando(null);
                            setModalOpen(true);
                        }}
                        className="btn btn-primary mt-3"
                    >
                        + Nuevo horario
                    </button>

                </div>

            </div>

            {/* MODAL */}

            <HorarioModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={guardarHorario}
                horario={horarioEditando}
            />

        </AdminLayout>

    );

}

export default Horarios;