import { useState, useEffect } from "react";
import axios from "axios";

function PagosModal({ isOpen, onClose, onSave, pago }) {

    const initialForm = {
        appointment_id: "",
        paciente: "",
        amount: "",
        payment_method: "",
        status: "Pagado",
        payment_date: ""
    };

    const [formData, setFormData] = useState(initialForm);

    const [citas, setCitas] = useState([]);

    const [mostrarResultados, setMostrarResultados] = useState(false);

    useEffect(() => {

        obtenerCitas();

    }, []);

    useEffect(() => {

        if (pago) {

            setFormData(pago);

        } else {

            setFormData(initialForm);

        }

    }, [pago]);

    const obtenerCitas = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/citas"
            );

            setCitas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const seleccionarCita = (cita) => {

        setFormData({
            ...formData,

            appointment_id: cita.appointment_id,

            paciente:
                `${cita.name} ${cita.lastname} | ${cita.date}`
        });

        setMostrarResultados(false);

    };

    const citasFiltradas = citas.filter((c) =>

        `${c.name} ${c.lastname}`
            .toLowerCase()
            .includes(formData.paciente.toLowerCase())

    );

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

        setFormData(initialForm);

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-lg rounded-4 shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">

                    💳 {pago ? "Editar Pago" : "Nuevo Pago"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >

                    {/* BUSCADOR DE CITAS */}

                    <div className="position-relative">

                        <input
                            type="text"
                            placeholder="Buscar paciente..."
                            value={formData.paciente}
                            onChange={(e) => {

                                setFormData({
                                    ...formData,
                                    paciente: e.target.value
                                });

                                setMostrarResultados(true);

                            }}
                            className="form-control rounded-pill p-3 shadow-sm border-0 bg-light"
                            autoComplete="off"
                            required
                        />

                        {mostrarResultados &&
                            formData.paciente !== "" && (

                                <div
                                    className="position-absolute bg-white border rounded shadow w-100 mt-1"
                                    style={{
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        zIndex: 1000
                                    }}
                                >

                                    {citasFiltradas.length > 0 ? (

                                        citasFiltradas.map((c) => (

                                            <div
                                                key={c.appointment_id}
                                                className="p-2"
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                                onClick={() =>
                                                    seleccionarCita(c)
                                                }
                                            >

                                                <strong>
                                                    {c.name} {c.lastname}
                                                </strong>

                                                <br />

                                                <small>
                                                    {c.date} - {c.hour}
                                                </small>

                                            </div>

                                        ))

                                    ) : (

                                        <div className="p-2 text-muted">

                                            No encontrado

                                        </div>

                                    )}

                                </div>

                            )}

                    </div>

                    {/* MONTO */}

                    <input
                        type="number"
                        name="amount"
                        placeholder="Monto"
                        value={formData.amount}
                        onChange={handleChange}
                        className="form-control rounded-pill p-3 shadow-sm border-0 bg-light"
                        required
                    />

                    {/* FECHA */}

                    <input
                        type="datetime-local"
                        name="payment_date"
                        value={formData.payment_date}
                        onChange={handleChange}
                        className="form-control rounded-pill p-3 shadow-sm border-0 bg-light"
                        required
                    />

                    {/* METODO */}

                    <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        className="form-select rounded-pill p-3 shadow-sm border-0 bg-light"
                        required
                    >

                        <option value="">
                            Método de pago
                        </option>

                        <option value="Efectivo">
                            Efectivo
                        </option>

                        <option value="Tarjeta">
                            Tarjeta
                        </option>

                    </select>

                    {/* BOTONES */}

                    <div className="d-flex justify-content-center gap-3 mt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline-secondary rounded-pill px-4"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary rounded-pill px-4"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default PagosModal;