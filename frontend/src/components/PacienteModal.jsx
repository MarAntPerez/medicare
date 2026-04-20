import { useState, useEffect } from "react";

function PacienteModal({ isOpen, onClose, onSave, paciente }) {

    const initialForm = {
        name: "",
        lastname: "",
        email: "",
        cellphone: "",
        birthdate: "",
        password: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (paciente) {
            setForm(paciente);
        }

    }, [paciente]);

    const handleChange = (e) => {

        setForm(initialForm);
        onClose();

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await onSave(form);

        setForm(initialForm);

    };

    if (!isOpen) return null;

    return (

        <div style={{marginTop: "80px"}} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* MODAL */}
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">

                {/* TITULO */}

                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">

                    {paciente ? "✏ Editar Paciente" : "➕ Nuevo Paciente"}

                </h2>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <div className="row g-3">

                        <div className="col-md-6">

                            <label className="form-label">
                                Nombre
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
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
                                placeholder="Apellido"
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
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Telefono
                            </label>

                            <input
                                type="text"
                                name="cellphone"
                                placeholder="Teléfono"
                                value={form.cellphone}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Fecha de nacimiento
                            </label>

                            <input
                                type="date"
                                name="birthdate"
                                value={form.birthdate}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={handleChange}
                                className="input-style"
                            />

                        </div>

                    </div>

                    {/* BOTONES */}

                    <div className="col-span-2 flex justify-center gap-4 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-danger btn-sm"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success btn-sm"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default PacienteModal;