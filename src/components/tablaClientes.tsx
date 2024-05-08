import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/clientesService";
import { Table } from "antd";
import { Clientes } from "../models/clientes";

const TablaCliente: React.FC = () => {
  const [clients, setCliente] = useState<Clientes[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientes = await getCustomers();
        setCliente(clientes);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchClients();
  }, []);

  const columns = [
    {
        title: 'ID_Cliente',
        dataIndex: 'id_cliente',
        key: 'id_cliente',
        
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
    
      {
        title: 'Apellido',
        dataIndex: 'apellido',
        key: 'apellido',
      },
      {
        title: 'fecha_nac',
        dataIndex: 'fecha_nac',
        key: 'fecha_nac',
      },
    
      {
        title: 'fk_genero',
        dataIndex: 'fk_genero',
        key: 'fk_genero',
      },
    
      {
        title: 'Telefono',
        dataIndex: 'telefono',
        key: 'telefono',
      },
    
      {
        title: 'Correo',
        dataIndex: 'correo',
        key: 'correo',
      },
    
      {
        title: 'fk_direccion',
        dataIndex: 'fk_direccion',
        key: 'fk_direccion',
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
        dataSource={clients}
      />

    </>
  );
}


export default TablaCliente;