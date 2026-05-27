import { useNavigate, useLocation } from "react-router-dom";

function SidebarPaciente() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [

        {
            name: "Inicio",
            icon: "bi-house",
            path: "/paciente-dashboard"
        },

        {
            name: "Mis citas",
            icon: "bi-calendar-check",
            path: "/mis-citas"
        },

        {
            name: "Solicitar Cita",
            icon: "bi-clock-history",
            path: "/solicitar-cita"
        },

        {
            name: "Mi perfil",
            icon: "bi-person",
            path: "/mi-perfil"
        }

    ];

    return (

        <div
            className="bg-white border-end shadow-sm"
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                top: "70px",
                left: "0"
            }}
        >

            <div className="p-3">

                <h6 className="text-muted fw-bold">
                    PACIENTE
                </h6>

                <hr />

                {menuItems.map((item, index) => (

                    <button
                        key={index}
                        className={`btn w-100 text-start mb-2 d-flex align-items-center gap-2 ${location.pathname === item.path
                                ? "btn-primary"
                                : "btn-light"
                            }`}
                        onClick={() => navigate(item.path)}
                    >

                        <i className={`bi ${item.icon}`}></i>

                        {item.name}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default SidebarPaciente;