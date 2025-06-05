import { useApi } from "../../hooks/useApi";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const Tablecategorias = () => {
  const apiUrl = "http://adminfer.test/api/categorias";
  const { dataAPI, error } = useApi(apiUrl);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (dataAPI && dataAPI.length > 0) {
      const table = $(tableRef.current!).DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [dataAPI]);

  const [categoriaNuevo, setCategoriaNuevo] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoriaNuevo({ ...categoriaNuevo, [name]: value });
  };

  const guardarCategoria = async () => {
    const metodo = editando ? "PATCH" : "POST";
    const url = editando ? `${apiUrl}/${categoriaNuevo.id}` : apiUrl;

    try {
      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: categoriaNuevo.nombre,
          descripcion: categoriaNuevo.descripcion,
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        console.error("Error de validación:", resultado);
        alert(
          " No se pudo guardar la categoría.\n" +
            JSON.stringify(resultado.errors || resultado)
        );
        return;
      }

      alert(
        editando
          ? "Categoría actualizada correctamente"
          : "Categoría registrada correctamente"
      );
      setMostrarModal(false);
      setEditando(false);
      setCategoriaNuevo({ id: "", nombre: "", descripcion: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error en la petición:", error);
      alert(" Error al guardar la categoría");
    }
  };

  const eliminarCategoria = async (id: string) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const respuesta = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (!respuesta.ok) {
          throw new Error("No se pudo eliminar la categoría");
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: "La categoría fue eliminada.",
          icon: "success",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al eliminar la categoría",
          "error"
        );
      }
    }
  };

  return (
    <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
      <div className="d-flex justify-content-start align-items-center mb-3 gap-3">
        <button
          className="btn btn-success"
          onClick={() => {
            setMostrarModal(true);
            setEditando(false);
            setCategoriaNuevo({ id: "", nombre: "", descripcion: "" });
          }}
        >
          Agregar categoría
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {dataAPI && dataAPI.length > 0 ? (
        <div className="table-responsive">
          <table
            className="table table-striped"
            ref={tableRef}
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((categoria, index) => (
                <tr key={categoria.id || index}>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion}</td>
                  <td>{categoria.estado}</td>
                  <td className="text-nowrap text-center">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => {
                        setCategoriaNuevo({
                          id: categoria.id,
                          nombre: categoria.nombre,
                          descripcion: categoria.descripcion,
                        });
                        setEditando(true);
                        setMostrarModal(true);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i> Actualizar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCategoria(categoria.id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando categorías...</p>
        </div>
      )}

      {mostrarModal && (
        <>
          <div className="modal d-block" tabIndex={-1} role="dialog">
            <div
              className="modal-dialog modal-lg modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editando ? "Editar Categoría" : "Agregar Categoría"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setMostrarModal(false);
                      setEditando(false);
                      setCategoriaNuevo({
                        id: "",
                        nombre: "",
                        descripcion: "",
                      });
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre"
                          value={categoriaNuevo.nombre}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <input
                          type="text"
                          className="form-control"
                          name="descripcion"
                          value={categoriaNuevo.descripcion}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setMostrarModal(false);
                      setEditando(false);
                      setCategoriaNuevo({
                        id: "",
                        nombre: "",
                        descripcion: "",
                      });
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={guardarCategoria}
                  >
                    {editando ? "Actualizar categoría" : "Guardar categoría"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Tablecategorias;
