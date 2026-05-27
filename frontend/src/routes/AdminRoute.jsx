import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));

    // NO LOGUEADO

    if (!user) {

        return <Navigate to="/" />;

    }

    // NO ES ADMIN

    if (user.user_type !== "admin") {

        return <Navigate to="/paciente-dashboard" />;

    }

    return children;

}

export default AdminRoute;