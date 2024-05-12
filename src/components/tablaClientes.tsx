import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/clientesService";
import { Clientes } from "../models/clientes";
import { Table, Button, Drawer, Form, Input, Select, DatePicker } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaCliente: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [clients, setCliente] = useState<Clientes[]>([]);
  const { Option } = Select;

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
      <Drawer title="Agregar Cliente" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
          <Form.Item label="Nombre" name="nombre">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Apellido" name="apellido">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Fecha de nacimiento" name="fecha_nac">
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Telefono"
            rules={[{message: 'introduce tu numero telefonico!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
            <Input />
      </Form.Item>
        </form>
      </Drawer>
    </>
  );
}


export default TablaCliente;