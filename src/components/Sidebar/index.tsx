import React from "react";

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
            <a className="nav-link" href="#">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Panel
            </a>

            <div className="sb-sidenav-menu-heading">Administración</div>
            <a className="nav-link" href="/usuarios">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              Usuarios
            </a>

            <div className="sb-sidenav-menu-heading">Módulos</div>
            <a className="nav-link" href="/categorias">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tags"></i>
              </div>
              Categorías
            </a>
            <a className="nav-link" href="/marcas">
              <div className="sb-nav-link-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              Marcas
            </a>
            <a className="nav-link" href="/productos">
              <div className="sb-nav-link-icon">
                <i className="fas fa-cart-shopping"></i>
              </div>
              Productos
            </a>
            <a className="nav-link" href="/tablas">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tablas
            </a>
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
