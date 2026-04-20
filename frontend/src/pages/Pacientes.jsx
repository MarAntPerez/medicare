import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import PacienteModal from "../components/PacienteModal";

function Pacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteEditando, setPacienteEditando] = useState(null);
    const pacientesFiltrados = pacientes.filter(p =>
        p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.lastname.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        obtenerPacientes();
    }, []);

    const obtenerPacientes = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/pacientes"
            );

            setPacientes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const guardarPaciente = async (data) => {

        try {

            if (pacienteEditando) {

                await axios.put(
                    `http://127.0.0.1:8000/api/pacientes/${pacienteEditando.user_id}`,
                    data
                );

            } else {

                await axios.post(
                    "http://127.0.0.1:8000/api/pacientes",
                    data
                );

            }

            setModalOpen(false);

            obtenerPacientes();

        } catch (error) {

            console.error(error);

        }

    };

    const eliminarPaciente = async (id) => {

        if (!confirm("¿Eliminar paciente?")) return;

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/pacientes/${id}`
            );

            obtenerPacientes();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AdminLayout>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-700">
                    👥 Pacientes
                </h2>

                <input
                    type="text"
                    className="input-style-2 w-64"
                    placeholder="Buscar paciente..."
                    value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                />

            </div>

            {/* TABLA */}

            <div className="card shadow border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-primary">

                            <tr className="bg-blue-100">

                                <th className="p-3">ID</th>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Teléfono</th>
                                <th className="p-3">Nacimiento</th>
                                <th className="p-3">Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {pacientes.length > 0 ? (

                                pacientesFiltrados.map((p) => (

                                    <tr key={p.user_id} className="border-b">

                                        <td className="p-3">
                                            {p.user_id}
                                        </td>

                                        <td className="p-3">
                                            {p.name} {p.lastname}
                                        </td>

                                        <td className="p-3">
                                            {p.email}
                                        </td>

                                        <td className="p-3">
                                            {p.cellphone}
                                        </td>

                                        <td className="p-3">
                                            {p.birthdate}
                                        </td>

                                        <td className="p-3 flex gap-2">

                                            <button
                                                onClick={() => {
                                                    setPacienteEditando(p);
                                                    setModalOpen(true);
                                                }}
                                                className="btn btn-success btn-sm"
                                            >
                                                ✏ Editar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    eliminarPaciente(p.user_id)
                                                }}
                                                className="btn btn-danger btn-sm"
                                            >
                                                🗑 Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="7" className="text-center text-muted">

                                        No hay pacientes registrados

                                    </td>

                                </tr>

                            )}


                        </tbody>

                    </table>

                    <button
                        onClick={() => {
                            setPacienteEditando(null);
                            setModalOpen(true);
                        }}
                        className="btn btn-primary w-20"
                    >
                        + Nuevo paciente
                    </button>

                </div>

            </div>

            <PacienteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={guardarPaciente}
                paciente={pacienteEditando}
            />

        </AdminLayout>

    );

}

export default Pacientes;