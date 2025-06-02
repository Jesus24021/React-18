import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Inicio</div>
            <Link className="nav-link" to="#">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Panel
            </Link>

            <div className="sb-sidenav-menu-heading">Administración</div>
            <Link className="nav-link" to="/usuarios">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              Usuarios
            </Link>

            <div className="sb-sidenav-menu-heading">Módulos</div>
            <Link className="nav-link" to="/categorias">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tags"></i>
              </div>
              Categorías
            </Link>
            <Link className="nav-link" to="/marcas">
              <div className="sb-nav-link-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              Marcas
            </Link>
            <Link className="nav-link" to="/productos">
              <div className="sb-nav-link-icon">
                <i className="fas fa-cart-shopping"></i>
              </div>
              Productos
            </Link>
            <Link className="nav-link" to="/tablas">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tablas
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start Bootstrap
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
