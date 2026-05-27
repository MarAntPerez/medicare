import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function MotivoCita() {

  const location = useLocation();
  const navigate = useNavigate();

  // VALIDAR DATOS

  if (!location.state) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial"
        }}
      >

        <h1>No hay información de la cita</h1>

      </div>

    );

  }

  const { fecha, horario } = location.state;

  const [motivo, setMotivo] = useState("");
  const [sintomas, setSintomas] = useState("");

  const confirmarCita = () => {

    if (!motivo) {
      alert("Escribe el motivo de la cita");
      return;
    }

    alert(`Cita confirmada

Fecha: ${fecha}
Horario: ${horario}

Motivo: ${motivo}

Síntomas: ${sintomas}`);

    navigate("/cliente");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
            color: "#0f172a"
          }}
        >
          Motivo de la cita
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px"
          }}
        >
          Completa la información de tu consulta médica.
        </p>

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

          <p>
            <strong>Fecha:</strong> {fecha}
          </p>

          <p>
            <strong>Horario:</strong> {horario}
          </p>

        </div>

        {/* MOTIVO */}

        <div
          style={{
            marginBottom: "25px"
          }}
        >

          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            Motivo de la cita
          </label>

          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows="5"
            placeholder="Describe el motivo de tu consulta..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "none"
            }}
          />

        </div>

        {/* SÍNTOMAS */}

        <div
          style={{
            marginBottom: "35px"
          }}
        >

          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            Síntomas u observaciones
          </label>

          <textarea
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            rows="4"
            placeholder="Escribe síntomas o información adicional..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "none"
            }}
          />

        </div>

        {/* BOTÓN */}

        <button
          onClick={confirmarCita}
          style={{
            width: "100%",
            padding: "18px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Confirmar cita
        </button>

      </div>

    </div>

  );

}

export default MotivoCita;