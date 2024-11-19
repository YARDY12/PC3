import React, { useState, useEffect } from "react";
import axios from "axios";
import { Embarcacion } from "./types";
import EmbarcacionForm from "./components/EmbarcacionForm";
import EmbarcacionTable from "./components/EmbarcacionTable";

const App: React.FC = () => {
  // Estado para almacenar la lista momentánea de embarcaciones
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);

  // Estado para almacenar la embarcación que se está editando
  const [embarcacionEdit, setEmbarcacionEdit] = useState<Embarcacion | null>(null);

  // Hook que se ejecuta una vez al mostrar el componente para obtener
  // la lista de embarcaciones
  useEffect(() => {
    // Llamar a la función para obtener la lista de embarcaciones
    obtenerEmbarcaciones();
  }, []);

  // Función para obtener la lista de embarcaciones
  const obtenerEmbarcaciones = async () => {
    try {
      // Hace una solicitud GET a la API de embarcaciones
      const response = await axios.get<Embarcacion[]>("http://localhost:8080/api/embarcaciones");
      // Actualiza el estado (Información de las embarcaciones)
      setEmbarcaciones(response.data);
    } catch (error) {
      // Muestra el error
      console.log(error);
    }
  };

  const manejarCrear = async (embarcacion: Omit<Embarcacion, "id">) => {
    try {
      // Hace una solicitud POST a la API de embarcaciones
      await axios.post<Embarcacion>("http://localhost:8080/api/embarcaciones", embarcacion);
      // Actualiza el estado (Información de las embarcaciones)
      obtenerEmbarcaciones();
    } catch (error) {
      // Muestra el error
      if (axios.isAxiosError(error)) {
        console.error("Error en la solicitud:", error.response?.data);
      } else {
        console.error("Error desconocido:", error);
      }
    }
  };

  const manejarActualizar = async (embarcacion: Embarcacion) => {
    if (!embarcacionEdit) return;
    try {
      // Hace una solicitud PUT a la API de embarcaciones
      await axios.put<Embarcacion>(
        `http://localhost:8080/api/embarcaciones/${embarcacionEdit.id}`,
        embarcacion
      );
      // Actualiza el estado (Información de las embarcaciones)
      obtenerEmbarcaciones();
    } catch (error) {
      // Muestra el error
      console.log(error);
    }
  };

  const manejarEliminar = async (id: number) => {
    try {
      // Hace una solicitud DELETE a la API de embarcaciones
      await axios.delete<Embarcacion>(`http://localhost:8080/api/embarcaciones/${id}`);
      // Actualiza el estado (Información de las embarcaciones)
      obtenerEmbarcaciones();
    } catch (error) {
      // Muestra el error
      console.log(error);
    }
  };

  const iniciarEdicion = (embarcacion: Embarcacion) => {
    setEmbarcacionEdit(embarcacion);
  };

  const cancelarEdicion = () => {
    // Limpiar la embarcación que está editando
    setEmbarcacionEdit(null);
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h1>CRUD de Embarcaciones</h1>
      {/* Componente de formulario para crear o editar embarcaciones */}
      <EmbarcacionForm
        // Determina qué función ejecutar para crear o editar embarcaciones
        onSubmit={(embarcacion) =>
          embarcacionEdit
            ? manejarActualizar({ ...embarcacion, id: embarcacionEdit.id })
            : manejarCrear(embarcacion)
        }
        onCancel={embarcacionEdit ? cancelarEdicion : undefined}
        initialData={embarcacionEdit || undefined} // Datos iniciales para editar
      />
      <EmbarcacionTable
        embarcaciones={embarcaciones}
        onEdit={iniciarEdicion}
        onDelete={manejarEliminar}
      />
    </div>
  );
};

export default App;
