import React from "react";
import Tablesusers from "../components/Usuarios";

const Usuarios: React.FC = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 text-center">Usuarios</h1>

      <Tablesusers />
    </div>
  );
};

export default Usuarios;
