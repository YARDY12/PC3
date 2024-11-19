import React from "react";
import { Embarcacion } from "../types";

interface EmbarcacionTableProps {
  embarcaciones: Embarcacion[];
  onEdit: (embarcacion: Embarcacion) => void;
  onDelete: (id: number) => void;
}

const EmbarcacionTable: React.FC<EmbarcacionTableProps> = ({
  embarcaciones,
  onEdit,
  onDelete,
}) => {
  return (
    <table
      border={1}
      cellPadding={10}
      cellSpacing={0}
      style={{ width: "100%", textAlign: "center" }}
    >
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Capacidad</th>
          <th>Descripción</th>
          <th>Fecha Programada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {embarcaciones.map((embarcacion) => (
          <tr key={embarcacion.id}>
            <td>{embarcacion.id}</td>
            <td>{embarcacion.nombre}</td>
            <td>{embarcacion.capacidad}</td>
            <td>{embarcacion.descripcion}</td>
            <td>{embarcacion.fechaProgramada}</td>
            <td>
              <button
                onClick={() => onEdit(embarcacion)}
                style={{ marginRight: "10px" }}
              >
                Editar
              </button>
              <button onClick={() => onDelete(embarcacion.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmbarcacionTable;
