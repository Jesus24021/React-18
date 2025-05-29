import { useApi } from "../../hooks/useApi";
const Tablesusers = () => {
  const apiUrl = "https://ferreone.ultimatetics.com.mx/api/usuario";
  const { dataAPI, error } = useApi(apiUrl);

  return (
    <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
      <h1 className="h3 mb-4 text-primary">Listado de Usuarios</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {dataAPI && dataAPI.length > 0 ? (
        <div className="table-responsive-sm">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
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
                    <td className="text-danger fw-bold">{index + 1}</td>
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando datos...</p>
        </div>
      )}
    </div>
  );
};
export default Tablesusers;
