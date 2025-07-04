import { useApi } from "../../hooks/useApi";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const Tablesusers = () => {
  const apiUrl = "https://ferreone.ultimatetics.com.mx/api/usuario";
  const { dataAPI, error } = useApi(apiUrl);
  const [mostrarModal, setMostrarModal] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (dataAPI && dataAPI.length > 0) {
      const table = $(tableRef.current!).DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [dataAPI]);

  const [usuarioNuevo, setUsuarioNuevo] = useState({
    nombre_completo: "",
    nombre_usuario: "",
    correo_electronico: "",
    contrasennia: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioNuevo({ ...usuarioNuevo, [name]: value });
  };

  const guardarUsuario = async () => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioNuevo),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        console.error("Error de validación:", resultado);
        alert(
          " No se pudo registrar el producto.\n" +
            JSON.stringify(resultado.errors || resultado)
        );
        return;
      }
      alert("Usuario registrado correctamente");
      setMostrarModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error en la petición:", error);
      alert(" Error al registrar el usuario");
    }
  };

  const eliminarUsuario = async (id: string) => {
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
          throw new Error("No se pudo eliminar el usuario");
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario fue eliminado.",
          icon: "success",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el usuario", "error");
      }
    }
  };

  return (
    <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
      <div className="d-flex justify-content-start align-items-center mb-3 gap-3">
        <button
          className="btn btn-success"
          onClick={() => setMostrarModal(true)}
        >
          Agregar usuario
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
                <th>Nombre Completo</th>
                <th>Nombre de Usuario</th>
                <th>Correo Electrónico</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((usuario, index) => {
                return (
                  <tr key={usuario.id || index}>
                    <td>{usuario.nombre_completo}</td>
                    <td>{usuario.nombre_usuario}</td>
                    <td>{usuario.correo_electronico}</td>
                    <td>
                      <span
                        className={`badge ${
                          usuario.activo ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {usuario.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="text-nowrap text-center">
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="bi bi-pencil-square"></i> Actualizar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarUsuario(usuario.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando datos...</p>
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
                  <h5 className="modal-title">Registrar usuario</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMostrarModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre Completo</label>
                        <input
                          type="text"
                          className="form-control"
                          name="clave_p"
                          value={usuarioNuevo.nombre_completo}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Nombre de Usuario</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre_p"
                          value={usuarioNuevo.nombre_usuario}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Correo Electronico</label>
                        <input
                          type="text"
                          className="form-control"
                          name="descripcion_p"
                          value={usuarioNuevo.correo_electronico}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          name="categoria_id"
                          value={usuarioNuevo.contrasennia}
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
                    onClick={() => setMostrarModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={guardarUsuario}
                  >
                    Guardar usuario
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
export default Tablesusers;
