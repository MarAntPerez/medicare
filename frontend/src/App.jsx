import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CitasPendientes from "./pages/CitasPendientes";
import HistorialCitas from "./pages/HistorialCitas";
import Perfil from "./pages/Perfil";
import Pacientes from "./pages/Pacientes";
import Pagos from "./pages/Pagos";
import Horarios from "./pages/Horarios";
import PacienteDashboard from "./pages/PacienteDashboard";
import SolicitarCita from "./pages/SolicitarCita";
import MisCitas from "./pages/MisCitas";
import MisPagos from "./pages/MisPagos";
import PerfilPaciente from "./pages/PerfilPaciente";

import AdminRoute from "./routes/AdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        {/* RUTAS ADMIN */}
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/citas-pendientes" element={<AdminRoute><CitasPendientes /></AdminRoute>} />
        <Route path="/historial-citas" element={<AdminRoute><HistorialCitas /></AdminRoute>} />
        <Route path="/perfil" element={<AdminRoute><Perfil /></AdminRoute>} />
        <Route path="/pacientes" element={<AdminRoute><Pacientes /></AdminRoute>} />
        <Route path="/pagos" element={<AdminRoute><Pagos /></AdminRoute>} />
        <Route path="/horarios" element={<AdminRoute><Horarios /></AdminRoute>} />

        <Route path="/paciente-dashboard" element={<PacienteDashboard />} />
        <Route path="/solicitar-cita" element={<SolicitarCita />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/mis-pagos" element={<MisPagos />} />
        <Route path="/mi-perfil" element={<PerfilPaciente />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;