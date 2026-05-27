import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PacienteLayout from "../layouts/PacienteLayout";

function SolicitarCita() {

  const [horarios, setHorarios] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  const navigate = useNavigate();

  /* OBTENER HORARIOS */

  useEffect(() => {

    if (fecha) {

      obtenerHorarios();

    }

  }, [fecha]);

  const obtenerHorarios = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/horarios-disponibles/${fecha}`
      );

      setHorarios(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  /* SOLICITAR CITA */

  const solicitarCita = async () => {

    if (!fecha) {
      alert("Selecciona una fecha");
      return;
    }

    if (!horarioSeleccionado) {
      alert("Selecciona un horario");
      return;
    }

    if (!motivo) {
      alert("Escribe el motivo de la cita");
      return;
    }

    console.log({
      patient_id: localStorage.getItem("user_id"),
      schedule_id: horarioSeleccionado.schedule_id,
      motivo: motivo
    });

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/solicitar-cita",
        {

          patient_id: localStorage.getItem("user_id"),

          schedule_id: horarioSeleccionado.schedule_id,

          motivo: motivo

        }
      );

      alert("Cita solicitada correctamente");

      setFecha("");
      setMotivo("");
      setHorarios([]);
      setHorarioSeleccionado(null);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <PacienteLayout>

      {/* TITULO */}

      <div className="mb-5">

        <h2 className="fw-bold text-dark">
          🩺 Solicitar cita médica
        </h2>

        <p className="text-muted">
          Agenda una cita seleccionando fecha y horario disponible.
        </p>

      </div>

      {/* CARD */}

      <div className="card shadow border-0 rounded-4">

        <div className="card-body p-5">

          {/* FECHA */}

          <div className="mb-4">

            <label className="form-label fw-semibold mb-3">
              Fecha de la cita
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) => {

                setFecha(e.target.value);
                setHorarioSeleccionado(null);

              }}
              className="input-style w-64"
            />

          </div>

          {/* MOTIVO */}

          <div className="mb-5">

            <label className="form-label fw-semibold mb-3">
              Motivo de la cita
            </label>

            <textarea
              rows="4"
              placeholder="Describe el motivo de la consulta..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="input-style"
            />

          </div>

          {/* HORARIOS */}

          <div className="mb-5">

            <h5 className="fw-bold mb-4">
              Horarios disponibles
            </h5>

            {!fecha && (

              <p className="text-muted">
                Selecciona una fecha para mostrar horarios.
              </p>

            )}

            {fecha && horarios.length === 0 && (

              <p className="text-danger">
                No hay horarios disponibles.
              </p>

            )}

            <div className="row g-4">

              {horarios.map((horario) => (

                <div
                  key={horario.schedule_id}
                  className="col-md-3"
                >

                  <button
                    className={`w-100 p-4 rounded-4 border ${horarioSeleccionado?.schedule_id === horario.schedule_id
                      ? "btn btn-primary"
                      : "btn btn-light"
                      }`}
                    onClick={() =>
                      setHorarioSeleccionado(horario)
                    }
                  >

                    <div className="fw-bold fs-5">

                      {horario.hour.slice(0, 5)}

                    </div>

                    <div className="small mt-2 text-success">

                      Disponible

                    </div>

                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* RESUMEN */}

          <div className="alert alert-primary rounded-4 mb-4">

            <h5 className="fw-bold">
              📋 Resumen
            </h5>

            <p className="mb-2">
              <strong>Fecha:</strong> {fecha || "No seleccionada"}
            </p>

            <p className="mb-2">
              <strong>Horario:</strong>{" "}
              {horarioSeleccionado?.hour || "No seleccionado"}
            </p>

            <p className="mb-0">
              <strong>Motivo:</strong>{" "}
              {motivo || "No especificado"}
            </p>

          </div>

          {/* BOTON */}

          <button
            onClick={solicitarCita}
            className="btn btn-primary btn-lg w-100 rounded-4"
          >

            Solicitar cita

          </button>

        </div>

      </div>

    </PacienteLayout>

  );

}

export default SolicitarCita;