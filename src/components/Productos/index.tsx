import { useApi } from "../../hooks/useApi";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const TablaProductos = () => {
  const apiUrl = "http://adminfer.test/api/producto";
  const { dataAPI, error } = useApi(apiUrl);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditarId, setProductoEditarId] = useState<string | null>(null);
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

  const abrirModalAgregar = () => {
    setProductoNuevo({
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
    setProductoEditarId(null);
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoNuevo({ ...producto });
    setProductoEditarId(producto.id);
    setModoEdicion(true);
    setMostrarModal(true);
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
        alert(
          "No se pudo registrar el producto.\n" +
            JSON.stringify(resultado.errors || resultado)
        );
        return;
      }
      await Swal.fire("Éxito", "Producto registrado correctamente", "success");
      setMostrarModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al registrar el producto");
    }
  };

  const actualizarProducto = async () => {
    try {
      const respuesta = await fetch(`${apiUrl}/${productoEditarId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoNuevo),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        alert(
          "No se pudo actualizar el producto.\n" +
            JSON.stringify(resultado.errors || resultado)
        );
        return;
      }
      await Swal.fire(
        "Actualizado",
        "Producto actualizado correctamente",
        "success"
      );
      setMostrarModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar el producto");
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

        await Swal.fire(
          "Eliminado",
          "Producto eliminado correctamente",
          "success"
        );
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  };

  return (
    <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
      <div className="d-flex justify-content-start align-items-center mb-3 gap-3">
        <button className="btn btn-success" onClick={abrirModalAgregar}>
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
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Unidad</th>
                <th>Stock</th>
                <th>Ingreso</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((producto, index) => (
                <tr key={producto.id || index}>
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
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => abrirModalEditar(producto)}
                    >
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
          <div className="modal d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modoEdicion ? "Actualizar producto" : "Agregar producto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMostrarModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      {[
                        { label: "Clave", name: "clave_p" },
                        { label: "Nombre", name: "nombre_p" },
                        { label: "Descripción", name: "descripcion_p" },
                        { label: "Categoría", name: "categoria_id" },
                        {
                          label: "Precio Compra",
                          name: "precioc_p",
                          type: "number",
                        },
                        {
                          label: "Precio Venta",
                          name: "preciov_p",
                          type: "number",
                        },
                        { label: "Unidad", name: "unidadM_p" },
                        { label: "Stock", name: "stock_p", type: "number" },
                        {
                          label: "Fecha de ingreso",
                          name: "fingreso_p",
                          type: "date",
                        },
                      ].map(({ label, name, type = "text" }, i) => (
                        <div className={`col-md-${i < 3 ? 6 : 4}`} key={name}>
                          <label className="form-label">{label}</label>
                          <input
                            type={type}
                            className="form-control"
                            name={name}
                            value={(productoNuevo as any)[name]}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
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
                    onClick={modoEdicion ? actualizarProducto : guardarProducto}
                  >
                    {modoEdicion ? "Actualizar" : "Guardar"}
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
