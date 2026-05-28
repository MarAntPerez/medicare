import { useNavigate } from "react-router-dom";
import PacienteLayout from "../layouts/PacienteLayout";

function PacienteDashboard() {

    const navigate = useNavigate();

    return (

        <PacienteLayout>

            <h2 className="fw-bold mb-4">
                🏥 Panel del Paciente
            </h2>

            <div className="row g-4">

                {/* PERFIL */}

                <div className="col-md-4">

                    <div className="card shadow h-100 border-0 dashboard-card">

                        <div className="card-body text-center">

                            <h1>👤</h1>

                            <h5 className="fw-bold mt-3">
                                Mi perfil
                            </h5>

                            <p className="text-muted">
                                Edita tu información personal
                            </p>

                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => navigate("/mi-perfil")}
                            >
                                Ver perfil
                            </button>

                        </div>

                    </div>

                </div>

                {/* SOLICITAR CITA */}

                <div className="col-md-4">

                    <div className="card shadow h-100 border-0 dashboard-card">

                        <div className="card-body text-center">

                            <h1>📅</h1>

                            <h5 className="fw-bold mt-3">
                                Solicitar cita
                            </h5>

                            <p className="text-muted">
                                Agenda una nueva cita médica
                            </p>

                            <button
                                className="btn btn-primary w-100"
                                onClick={() => navigate("/solicitar-cita")}
                            >
                                Agendar cita
                            </button>

                        </div>

                    </div>

                </div>

                {/* MIS CITAS */}

                <div className="col-md-4">

                    <div className="card shadow h-100 border-0 dashboard-card">

                        <div className="card-body text-center">

                            <h1>📜</h1>

                            <h5 className="fw-bold mt-3">
                                Mis citas
                            </h5>

                            <p className="text-muted">
                                Consulta tus citas programadas
                            </p>

                            <button
                                className="btn btn-success w-100"
                                onClick={() => navigate("/mis-citas")}
                            >
                                Ver citas
                            </button>

                        </div>

                    </div>

                </div>

                {/* PAGOS */}

                <div className="col-md-4">

                    <div className="card shadow h-100 border-0 dashboard-card">

                        <div className="card-body text-center">

                            <h1>💳</h1>

                            <h5 className="fw-bold mt-3">
                                Mis pagos
                            </h5>

                            <p className="text-muted">
                                Consulta pagos realizados
                            </p>

                            <button
                                className="btn btn-danger w-100"
                                onClick={() => navigate("/mis-pagos")}
                            >
                                Ver pagos
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PacienteLayout>

    );

}

export default PacienteDashboard;