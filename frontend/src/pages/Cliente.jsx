import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cliente() {

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  // HORARIOS POR DÍA

const horariosPorDia = {

  "2026-05-27": [
    { hora: "09:00 AM", disponible: true },
    { hora: "10:00 AM", disponible: true },
    { hora: "11:00 AM", disponible: true },
    { hora: "12:00 PM", disponible: true },
  ],

  "2026-05-28": [
    { hora: "09:00 AM", disponible: true },
    { hora: "10:00 AM", disponible: true },
    { hora: "11:00 AM", disponible: true },
    { hora: "01:00 PM", disponible: true },
  ],

  "2026-05-29": [
    { hora: "02:00 PM", disponible: true },
    { hora: "03:00 PM", disponible: true },
    { hora: "04:00 PM", disponible: true },
    { hora: "05:00 PM", disponible: true },
  ],

};

  // OBTENER HORARIOS SEGÚN FECHA

  const horarios = horariosPorDia[fecha] || [];

  // SOLICITAR CITA

  const solicitarCita = () => {

  if (!fecha) {
    alert("Selecciona una fecha");
    return;
  }

  if (!horarioSeleccionado) {
    alert("Selecciona un horario");
    return;
  }

  navigate("/motivo-cita", {
    state: {
      fecha,
      horario: horarioSeleccionado
    }
  });

};

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px",
        fontFamily: "Arial, sans-serif"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            color: "#0f172a",
            marginBottom: "10px"
          }}
        >
          Solicitar Cita Médica
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px"
          }}
        >
          Consulta los horarios disponibles y agenda tu cita fácilmente.
        </p>

      </div>

      {/* CONTENEDOR */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >

        {/* FECHA */}

        <div
          style={{
            marginBottom: "40px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#1e293b"
            }}
          >
            Selecciona una fecha
          </h2>

          <input
            type="date"
            value={fecha}
            onChange={(e) => {

              setFecha(e.target.value);
              setHorarioSeleccionado(null);

            }}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              width: "250px",
              outline: "none"
            }}
          />

        </div>

        {/* HORARIOS */}

        <div
          style={{
            marginBottom: "50px"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              color: "#1e293b"
            }}
          >
            Horarios disponibles
          </h2>

          {!fecha && (

            <p
              style={{
                color: "#64748b",
                marginBottom: "20px"
              }}
            >
              Selecciona una fecha para ver horarios disponibles.
            </p>

          )}

          {fecha && horarios.length === 0 && (

            <p
              style={{
                color: "#dc2626",
                marginBottom: "20px"
              }}
            >
              No hay horarios disponibles para esta fecha.
            </p>

          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px"
            }}
          >

            {horarios.map((horario, index) => (

              <button
                key={index}
                disabled={!horario.disponible}
                onClick={() =>
                  setHorarioSeleccionado(horario.hora)
                }
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  border:
                    horarioSeleccionado === horario.hora
                      ? "3px solid #2563eb"
                      : "1px solid #dbeafe",
                  background:
                    !horario.disponible
                      ? "#e2e8f0"
                      : horarioSeleccionado === horario.hora
                      ? "#dbeafe"
                      : "#ffffff",
                  cursor:
                    !horario.disponible
                      ? "not-allowed"
                      : "pointer",
                  transition: "0.2s",
                  boxShadow:
                    horarioSeleccionado === horario.hora
                      ? "0 4px 12px rgba(37,99,235,0.2)"
                      : "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >

                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#0f172a"
                  }}
                >
                  {horario.hora}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color:
                      horario.disponible
                        ? "#16a34a"
                        : "#dc2626"
                  }}
                >
                  {horario.disponible
                    ? "Disponible"
                    : "Ocupado"}
                </div>

              </button>

            ))}

          </div>

        </div>

        {/* RESUMEN */}

        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "30px"
          }}
        >

          <h3
            style={{
              marginBottom: "10px",
              color: "#1d4ed8"
            }}
          >
            Resumen de cita
          </h3>

          <p
            style={{
              marginBottom: "10px"
            }}
          >
            <strong>Fecha:</strong> {fecha || "Sin seleccionar"}
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0f172a"
            }}
          >
            <strong>Horario:</strong>{" "}
            {horarioSeleccionado
              ? horarioSeleccionado
              : "Ningún horario seleccionado"}
          </p>

        </div>

        {/* BOTÓN */}

        <button
          onClick={solicitarCita}
          style={{
            width: "100%",
            padding: "18px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s"
          }}
        >
          Solicitar cita
        </button>

      </div>

    </div>

  );

}

export default Cliente;