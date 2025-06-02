import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

const CategoriasContent = () => {
  // Estado para las categorías
  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nombre: "Electricidad",
      descripcion:
        "Materiales para instalaciones eléctricas, como cables, interruptores, enchufes, canaletas, cajas de conexión, fusibles, lámparas, focos y herramientas para electricistas.",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Plomeria",
      descripcion:
        "Productos y accesorios para instalaciones y reparaciones de tuberías, como tubos de PVC y cobre, conexiones, válvulas, llaves de paso, cintas de teflón y más.",
      estado: "Activo",
    },
  ]);

  // Estados para controlar el modal
  const [showModal, setShowModal] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  // Función para manejar la eliminación
  const handleEliminarClick = (id) => {
    setCategoriaAEliminar(id);
    setShowModal(true);
  };

  // Función para confirmar eliminación
  const confirmarEliminacion = () => {
    setCategorias(categorias.filter((cat) => cat.id !== categoriaAEliminar));
    setShowModal(false);
    setCategoriaAEliminar(null);
  };

  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        <h1 className="mt-4 text-center">Categorías</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="index.html">Inicio</a>
          </li>
          <li className="breadcrumb-item active">Categorías</li>
        </ol>

        <div className="mb-4">
          <a href="registrar_categoria.html">
            <button type="button" className="btn btn-success">
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              Añadir nuevo registro
            </button>
          </a>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <FontAwesomeIcon icon={faTable} className="me-1" />
            Tabla Categorías
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.nombre}</td>
                      <td>{categoria.descripcion}</td>
                      <td>
                        <span
                          className={`fw-bolder p-1 rounded ${
                            categoria.estado === "Activo"
                              ? "bg-success"
                              : "bg-danger"
                          } text-white`}
                        >
                          {categoria.estado}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <a
                            href="editar_categoria.html"
                            className="btn btn-warning"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </a>

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleEliminarClick(categoria.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mensaje de confirmación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                ¿Seguro que quieres eliminar esta categoría?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmarEliminacion}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default CategoriasContent;
