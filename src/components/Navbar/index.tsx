// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="#">
        Ferretería Guzmán
      </a>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Buscar ..."
            aria-label="Search for..."
          />
          <button className="btn btn-primary" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#">
                Configuraciones
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Registro de actividad
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <li>
                <Link className="dropdown-item" to="/login">
                  Cerrar sesión
                </Link>
              </li>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
