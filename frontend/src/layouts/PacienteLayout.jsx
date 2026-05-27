import Navbar from "../components/Navbar";
import SidebarPaciente from "../components/SidebarPaciente";

function PacienteLayout({ children }) {

    return (

        <div className="bg-gray-100 min-vh-100">

            {/* NAVBAR */}

            <Navbar />

            <div className="d-flex">

                {/* SIDEBAR */}

                <SidebarPaciente />

                {/* CONTENIDO */}

                <main
                    className="flex-grow-1 p-4"
                    style={{
                        marginLeft: "250px",
                        marginTop: "70px"
                    }}
                >
                    {children}
                </main>

            </div>

        </div>

    );

}

export default PacienteLayout;