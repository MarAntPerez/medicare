import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      icon: "bi-speedometer2",
      path: "/dashboard"
    },

    {
      name: "Citas pendientes",
      icon: "bi-calendar-check",
      path: "/citas-pendientes"
    },

    {
      name: "Historial",
      icon: "bi-clock-history",
      path: "/historial-citas"
    },

    {
      name: "Perfil",
      icon: "bi-person",
      path: "/perfil"
    },

    {
      name: "Pacientes",
      icon: "bi-people",
      path: "/pacientes"
    }

  ];

  return (

    <div
      className="bg-white border-end shadow-sm"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: "70px", // debajo del navbar
        left: "0"
      }}
    >

      <div className="p-3">

        <h6 className="text-muted fw-bold">
          MENÚ
        </h6>

        <hr />

        {menuItems.map((item, index) => (

          <button
            key={index}
            className={`btn w-100 text-start mb-2 d-flex align-items-center gap-2 ${
              location.pathname === item.path
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

export default Sidebar;