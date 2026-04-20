import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CitasPendientes from "./pages/CitasPendientes";
import HistorialCitas from "./pages/HistorialCitas";
import Perfil from "./pages/Perfil";
import Pacientes from "./pages/Pacientes";
import Pagos from "./pages/Pagos";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citas-pendientes" element={<CitasPendientes />} />
        <Route path="/historial-citas" element={<HistorialCitas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pagos" element={<Pagos />}/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;