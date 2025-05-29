import { useApi } from "../../hooks/useApi";

const TablaProductos = () => {
  const apiUrl = "https://ferreone.ultimatetics.com.mx/api/producto";
  const { dataAPI, error } = useApi(apiUrl);

  return (
    <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
      <h1 className="h3 mb-4 text-success">Listado de Productos</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {dataAPI && dataAPI.length > 0 ? (
        <div className="table-responsive-sm">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Decripción</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Unidad</th>
                <th>Stock</th>
                <th>Fecha de ingreso</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((producto, index) => {
                return (
                  <tr key={producto.clave_p || index}>
                    <td>{producto.clave_p}</td>
                    <td>{producto.nombre_p}</td>
                    <td>{producto.descripcion_p}</td>
                    <th>{producto.categoria_id}</th>
                    <th>{producto.preciov_p}</th>
                    <th>{producto.unidadM_p}</th>
                    <th>{producto.stock_p}</th>
                    <th>{producto.fingreso_p}</th>
                    <td className="text-nowrap text-center">
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="bi bi-pencil-square"></i> Actualizar
                      </button>
                      <button className="btn btn-danger btn-sm">
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
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando productos...</p>
        </div>
      )}
    </div>
  );
};

export default TablaProductos;
