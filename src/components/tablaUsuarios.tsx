import React, { useEffect, useState } from "react";
import { getUsers, createUsuario } from "../services/usuariosService";
import { Table } from "antd";
import { Usuarios } from "../models/usuarios";
import { Button, Drawer, Form, Input } from 'antd';
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";


const TablaUsuarios: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [users, setUser] = useState<Usuarios[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("usuarios")
        .select("id_usuario")
        .order("id_usuario", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_usuario || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de usuarios con el nuevo ID
      const usuarioInput: Usuarios = {
        id_usuario: newId,
        nombre,
        apellido,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createUsuario(usuarioInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateUsuario = await getUsers();
      setUser(updateUsuario);
      onClose();
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };

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
        title: 'Apellido',
        dataIndex: 'apellido',
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
    <Button type="primary" onClick={showDrawer}>
        Agregar usuario
      </Button>
      <Table
        columns={columns}
        dataSource={users}
      />
       <Drawer title="Agregar Usuario" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
      <Form onFinish={handleSubmit}>
          <Form.Item label='Nombre' name='nombre' rules={[{ required: true, message: 'Ingrese nombre del usuario' }]}>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </Form.Item>
          <Form.Item label='Apellido' name='apellido' rules={[{ required: true, message: 'Ingrese apellido del usuario' }]}>
            <Input value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>
      

    </>
  );
}

export default TablaUsuarios;