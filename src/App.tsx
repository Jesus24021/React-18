import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"; 

import Usuarios from "./pages/usuarios";
import Productos from "./pages/productos";
import Categorias from "./pages/categorias";
import ListaProductos  from "./pages/Lista";


function App() {
  return (
    <Router>
      
      <div className="sb-nav-fixed">
        <Navbar />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <main>
              <Routes>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/Lista" element={<ListaProductos />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

