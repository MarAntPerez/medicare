import { useEffect, useState } from "react";

function HorarioModal({
    isOpen,
    onClose,
    onSave,
    horario
}) {

    const [formData, setFormData] = useState({

        date: "",
        hour: "",
        vacant: true

    });

    useEffect(() => {

        if (horario) {

            setFormData(horario);

        } else {

            setFormData({

                date: "",
                hour: "",
                vacant: true

            });

        }

    }, [horario]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

            <div className="bg-white p-5 rounded-4 shadow-lg w-100"
                style={{ maxWidth: "500px" }}
            >

                <h3 className="fw-bold mb-4 text-primary">

                    {horario ? "Editar horario" : "Nuevo horario"}

                </h3>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            Fecha
                        </label>

                        <input
                            type="date"
                            className="form-control rounded-3 p-2"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            Hora
                        </label>

                        <input
                            type="time"
                            className="form-control rounded-3 p-2"
                            value={formData.hour}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    hour: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Estado
                        </label>

                        <select
                            className="form-select rounded-3 p-2"
                            value={formData.vacant}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    vacant: e.target.value === "true"
                                })
                            }
                        >

                            <option value={true}>
                                Disponible
                            </option>

                            <option value={false}>
                                Ocupado
                            </option>

                        </select>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default HorarioModal;