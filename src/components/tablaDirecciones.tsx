import React, { useEffect, useState } from "react";
import { getAdresses } from "../services/direccionesService";
import { Table } from "antd";
import { Direcciones } from "../models/direcciones";

const TablaDireccion: React.FC = () => {
  const [direction, setDirection] = useState<Direcciones[]>([]);

  useEffect(() => {
    const fetchDirection = async () => {
      try {
        const direction = await getAdresses();
        setDirection(direction);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchDirection();
  }, []);

  const columns = [
    {
        title: 'ID_Direccion',
        dataIndex: 'id_direccion',
        key: 'id_direccion',
        
      },
      {
        title: 'Codigo_Postal',
        dataIndex: 'codigo_postal',
        key: 'codigo_postal',
      },
  
      {
        title: 'Colonia',
        dataIndex: 'colonia',
        key: 'colonia',
      },
  
      {
        title: 'Num_Ext',
        dataIndex: 'num_ext',
        key: 'num_ext',
      },
  
      {
        title: 'Num_Interior',
        dataIndex: 'num_int',
        key: 'num_int',
      },
  
      {
        title: 'Ciudad',
        dataIndex: 'ciudad',
        key: 'ciudad',
      },
  
      {
        title: 'FechaCreacion',
        dataIndex: 'fecha_creacion',
        key: 'fecha_creacion',
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
        dataSource={direction}
      />

    </>
  );
}

export default TablaDireccion;