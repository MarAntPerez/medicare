import { useState, useEffect } from "react";

function PagoModal({ isOpen, onClose, onSave, pago }) {

    const initialForm = {
        patient_name: "",
        amount: "",
        date: "",
        method: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (pago) {

            setForm(pago);

        } else {

            setForm(initialForm);

        }

    }, [pago]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(form);

        setForm(initialForm);

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

                <h2 className="text-xl font-bold mb-4 text-center">

                    💳 {pago ? "Editar Pago" : "Nuevo Pago"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                >

                    <input
                        type="text"
                        name="patient_name"
                        placeholder="Paciente"
                        value={form.patient_name}
                        onChange={handleChange}
                        className="input-style"
                        required
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Monto"
                        value={form.amount}
                        onChange={handleChange}
                        className="input-style"
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="input-style"
                        required
                    />

                    <select
                        name="method"
                        value={form.method}
                        onChange={handleChange}
                        className="input-style"
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

                        <option value="Transferencia">
                            Transferencia
                        </option>

                    </select>

                    <div className="flex justify-center gap-4 mt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-cancel"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default PagoModal;