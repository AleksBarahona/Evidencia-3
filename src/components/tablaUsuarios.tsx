import React, { useEffect, useState } from "react";
import { getUsers } from "../services/usuariosService";
import { Table } from "antd";
import { Usuarios } from "../models/usuarios";
const TablaUsuarios: React.FC = () => {
  const [users, setUser] = useState<Usuarios[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUsers();
        setUser(user);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUser();
  }, []);

  const columns = [
    {
        title: 'ID_Usuario',
        dataIndex: 'id_usuario',
        key: 'id_usuario',
        
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
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
        dataSource={users}
      />

    </>
  );
}

export default TablaUsuarios;