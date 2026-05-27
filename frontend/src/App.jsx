import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CitasPendientes from "./pages/CitasPendientes";
import HistorialCitas from "./pages/HistorialCitas";
import Perfil from "./pages/Perfil";
import Pacientes from "./pages/Pacientes";
import Pagos from "./pages/Pagos";
import Horarios from "./pages/Horarios";

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

      </Routes>

    </BrowserRouter>

  );

}

export default App;