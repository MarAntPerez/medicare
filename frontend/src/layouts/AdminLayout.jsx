import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {

  return (

    <div>

      {/* NAVBAR */}

      <Navbar />

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENIDO */}

      <div
        style={{
          marginTop: "80px",
          marginLeft: "50px",
          padding: "20px"
        }}
      >

        {children}

      </div>

    </div>

  );

}

export default AdminLayout;