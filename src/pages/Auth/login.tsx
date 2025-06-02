import React from "react";

function Login() {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div
            className="col col-xl-10 p-5 shadow-lg"
            style={{ backgroundColor: "rgb(134, 89, 41)" }}
          >
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block p-5">
                  <img
                    src="img/vector.jpg"
                    className="img-fluid"
                    alt="Vector"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <div className="text-center">
                      <img
                        className="pb-2"
                        src="img/constructor.png"
                        width={100}
                        height={100}
                        alt="Constructor"
                      />
                      <h1 className="fs-4 card-title fw-bold mb-4">
                        SISTEMA WEB DE ADMINISTRACIÓN PARA LA MICROEMPRESA
                        "GUZMÁN"
                      </h1>
                    </div>
                    <form id="login" /* Aquí agregarás el handler */>
                      <div className="mb-3">
                        <label className="mb-2 text-muted" htmlFor="email">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="text-muted" htmlFor="password">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="text-center pb-3">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg ms-auto"
                        >
                          Acceder
                        </button>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        {/* Aquí usa Link para navegación interna */}
                        <a href="/password-request" className="small">
                          ¿Olvidaste tu contraseña?
                        </a>
                        <a href="/register" className="small">
                          Crear una cuenta
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
