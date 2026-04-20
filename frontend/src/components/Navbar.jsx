import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  /* OBTENER USUARIO */

  useEffect(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("user"));

    if (storedUser) {

      setUserName(
        storedUser.name + " " +
        (storedUser.lastname || "")
      );

    }

  }, []);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <nav
      className="navbar navbar-expand-lg shadow fixed-top"
      style={{
        background:
          "linear-gradient(90deg, #0d6efd, #0dcaf0)"
      }}
    >

      <div className="container-fluid">

        {/* LOGO */}

        <span
          className="navbar-brand fw-bold text-white"
          style={{
            cursor: "pointer",
            fontSize: "1.3rem"
          }}
          onClick={() => navigate("/dashboard")}
        >
          🏥 Medicare
        </span>

        {/* USER + LOGOUT */}

        <div className="d-flex align-items-center gap-3">

          <span
            className="text-white fw-semibold"
            style={{ fontSize: "1rem" }}
          >
            👤 {userName}
          </span>

          <button
            className="btn btn-light btn-sm fw-semibold"
            onClick={handleLogout}
          >
            🔒 Cerrar sesión
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;