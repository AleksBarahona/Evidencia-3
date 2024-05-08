import React, { useEffect, useState } from "react";
import { getSessions } from "../services/sesionesService";
import { Table } from "antd";
import { Sesiones } from "../models/sesiones";

const TablaSesiones: React.FC = () => {
  const [session, setSessions] = useState<Sesiones[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSessions();
        setSessions(session);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSession();
  }, []);

  const columns = [
    {
        title: 'ID_Sesion',
        dataIndex: 'id_sesion',
        key: 'id_sesion',
        
      },
      {
        title: 'Fecha_Sesion',
        dataIndex: 'fecha_sesion',
        key: 'fecha_sesion',
      },
  
      {
        title: 'Hora_Sesion',
        dataIndex: 'hora_sesion',
        key: 'hora_sesion',
      },
  
      {
        title: 'fk_cliente',
        dataIndex: 'fk_cliente',
        key: 'fk_cliente',
      },
  
      {
        title: 'fecha_venta',
        dataIndex: 'fecha_venta',
        key: 'fecha_venta',
      },
  
      {
        title: 'fecha_creacion',
        dataIndex: 'fecha_creacion',
        key: 'fecha_creacion',
      },
  
      {
        title: 'fecha_actualizacion',
        dataIndex: 'fecha_actualizacion',
        key: 'fecha_actualizacion',
      },
      {
        title: 'fk_creado_por',
        dataIndex: 'fk_creado_por',
        key: 'fk_creado_por',
      },
  
      {
        title: 'fk_actualizado_por',
        dataIndex: 'fk_actualizado_por',
        key: 'fk_actualizado_por',
      },
  
      {
        title: 'fecha_eliminacion',
        dataIndex: 'fecha_eliminacion',
        key: 'fecha_eliminacion',
      },
  
      {
        title: 'fk_eliminado_por',
        dataIndex: 'fk_eliminado_por',
        key: 'fk_eliminado_por',
      }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={session}
      />

    </>
  );
}

export default TablaSesiones;