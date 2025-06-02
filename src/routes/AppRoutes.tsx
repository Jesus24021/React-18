import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productos from "../pages/productos";
import Categorias from "../pages/categorias";
import Usuarios from "../pages/usuarios";
import Login from "../pages/Auth/login"; 
import Header from "../components/Navbar";
import Footer from "../components/Sidebar";
import Menu from "../components/Footer";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Ruta Login sin layout */}
        <Route path="/login" element={<Login />} />

        {/* Rutas con layout */}
        <Route
          path="*"
          element={
            <div className="sb-nav-fixed">
              <Header />
              <div id="layoutSidenav">
                <Menu />
                <div id="layoutSidenav_content">
                  <main>
                    <Routes>
                      <Route path="/usuarios" element={<Usuarios />} />
                      <Route path="/productos" element={<Productos />} />
                      <Route path="/categorias" element={<Categorias />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
