import { useApi } from "../../hooks/useApi";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const TablaProductos = () => {
  const apiUrl = "https://ferreone.ultimatetics.com.mx/api/producto";
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

  const [productoNuevo, setProductoNuevo] = useState({
    clave_p: "",
    nombre_p: "",
    descripcion_p: "",
    categoria_id: "",
    precioc_p: "",
    preciov_p: "",
    unidadM_p: "",
    stock_p: "",
    fingreso_p: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductoNuevo({ ...productoNuevo, [name]: value });
  };

  const guardarProducto = async () => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoNuevo),
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
      alert("Producto registrado correctamente");
      setMostrarModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error en la petición:", error);
      alert(" Error al registrar el producto");
    }
  };

  const eliminarProducto = async (id: string) => {
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
          throw new Error("No se pudo eliminar el producto");
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto fue eliminado.",
          icon: "success",
          timer: 5000, 
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el producto", "error");
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
          Agregar producto
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
                <th>Clave</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Unidad</th>
                <th>Stock</th>
                <th>Ingreso</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((producto, index) => (
                <tr key={producto.clave_p || index}>
                  <td>{producto.clave_p}</td>
                  <td>{producto.nombre_p}</td>
                  <td>{producto.descripcion_p}</td>
                  <td>{producto.categoria_id}</td>
                  <td>{producto.precioc_p}</td>
                  <td>{producto.preciov_p}</td>
                  <td>{producto.unidadM_p}</td>
                  <td>{producto.stock_p}</td>
                  <td>{producto.fingreso_p}</td>
                  <td className="text-nowrap text-center">
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Actualizar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(producto.id)}
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
          <p className="mt-2 text-muted">Cargando productos...</p>
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
                  <h5 className="modal-title">Agregar producto</h5>
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
                        <label className="form-label">Clave</label>
                        <input
                          type="text"
                          className="form-control"
                          name="clave_p"
                          value={productoNuevo.clave_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre_p"
                          value={productoNuevo.nombre_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <input
                          type="text"
                          className="form-control"
                          name="descripcion_p"
                          value={productoNuevo.descripcion_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Categoría</label>
                        <input
                          type="text"
                          className="form-control"
                          name="categoria_id"
                          value={productoNuevo.categoria_id}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Precio de Compra</label>
                        <input
                          type="number"
                          className="form-control"
                          name="precioc_p"
                          value={productoNuevo.precioc_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Precio de Venta</label>
                        <input
                          type="number"
                          className="form-control"
                          name="preciov_p"
                          value={productoNuevo.preciov_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Unidad</label>
                        <input
                          type="text"
                          className="form-control"
                          name="unidadM_p"
                          value={productoNuevo.unidadM_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Stock</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock_p"
                          value={productoNuevo.stock_p}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Fecha de ingreso</label>
                        <input
                          type="date"
                          className="form-control"
                          name="fingreso_p"
                          value={productoNuevo.fingreso_p}
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
                    onClick={guardarProducto}
                  >
                    Guardar producto
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

export default TablaProductos;
