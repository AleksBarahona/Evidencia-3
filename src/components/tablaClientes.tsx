import React, { useEffect, useState } from "react";
import { getCustomers, createCliente } from "../services/clientesService";
import { Clientes } from "../models/clientes";
import { Table, Button, Drawer, Form, Input, Select, DatePicker } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaCliente: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [clients, setCliente] = useState<Clientes[]>([]);
  const { Option } = Select;
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [fecha_nac, setFecha] = useState<Date | undefined>();
  const [telefono, setTelefono] = useState<number | undefined>();
  const [correo, setCorreo] = useState<string>('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="52">+52</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("clientes")
        .select("id_cliente")
        .order("id_cliente", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_cliente || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de categoria con el nuevo ID
      const clienteInput: Clientes = {
        id_cliente: newId,
        nombre,
        apellido,
        fecha_nac,
        fk_genero: 1,
        telefono,
        correo,
        fk_direccion: 1,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createCliente(clienteInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateCliente = await getCustomers();
      setCliente(updateCliente);
      onClose();
    } catch (error) {
      console.error("Error creating cliente:", error);
    }
  };

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
    <Button type="primary" onClick={showDrawer}>
        Agregar Cliente
      </Button>
      <Table
        columns={columns}
        dataSource={clients}
      />
      <Drawer title="Agregar Cliente" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <form>
          <Form.Item label="Nombre" name="nombre">
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="Apellido" name="apellido">
            <Input value={apellido} onChange={(e) => setApellido(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="Fecha de nacimiento" name="fecha_nac">
            <DatePicker value={fecha_nac} onChange={(date) => setFecha(date)} />
          </Form.Item>
          <Form.Item name="telefono" label="Telefono" rules={[{message: 'introduce tu numero telefonico!' }]}>
            <Input addonBefore={prefixSelector} style={{ width: '100%' }}  value={telefono} onChange={(e) => setTelefono(Number(e.target.value))}/>
          </Form.Item>
          <Form.Item
            name="correo"
            label="Correo"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input  value={correo} onChange={(e) => setCorreo(e.target.value)}/>
      </Form.Item>
        </form>
      </Drawer>
    </>
  );
}


export default TablaCliente;