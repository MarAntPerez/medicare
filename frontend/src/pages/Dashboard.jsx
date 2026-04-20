import AdminLayout from "../layouts/AdminLayout";
import { useNavigate  } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <AdminLayout>

      <h2 className="fw-bold mb-4">
        📊 Dashboard Administrador
      </h2>

      {/* TARJETAS */}

      <div className="row g-4">

        {/* PERFIL */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>👤</h1>

              <h5 className="fw-bold mt-3">
                Administrar perfil
              </h5>

              <p className="text-muted">
                Editar información del usuario
              </p>

              <button
                className="btn btn-secondary w-100"
                onClick={() => navigate("/perfil")}
              >
                Ver perfil
              </button>

            </div>

          </div>

        </div>

        {/* PACIENTES */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>👥</h1>

              <h5 className="fw-bold mt-3">
                Pacientes
              </h5>

              <p className="text-muted">
                Administrar pacientes registrados
              </p>

              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/pacientes")}
              >
                Ver pacientes
              </button>

            </div>

          </div>

        </div>

        {/* CITAS PENDIENTES */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>📅</h1>

              <h5 className="fw-bold mt-3">
                Citas pendientes
              </h5>

              <p className="text-muted">
                Ver citas pendientes
              </p>

              <button
                className="btn btn-success w-100"
                onClick={() => navigate("/citas-pendientes")}
              >
                Ver citas
              </button>

            </div>

          </div>

        </div>

        {/* HISTORIAL */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>📜</h1>

              <h5 className="fw-bold mt-3">
                Historial de citas
              </h5>

              <p className="text-muted">
                Ver citas completadas
              </p>

              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/historial-citas")}
              >
                Ver historial
              </button>

            </div>

          </div>

        </div>

        {/* HORARIOS */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>⏰</h1>

              <h5 className="fw-bold mt-3">
                Horarios
              </h5>

              <p className="text-muted">
                Administrar horarios
              </p>

              <button
                className="btn btn-warning w-100"
                onClick={() => navigate("/horarios")}
              >
                Ver horarios
              </button>

            </div>

          </div>

        </div>

        {/* PAGOS */}

        <div className="col-md-4">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <h1>💳</h1>

              <h5 className="fw-bold mt-3">
                Pagos
              </h5>

              <p className="text-muted">
                Controlar pagos
              </p>

              <button
                className="btn btn-danger w-100"
                onClick={() => navigate("/pagos")}
              >
                Ver pagos
              </button>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );

}

export default Dashboard;