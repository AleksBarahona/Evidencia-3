import React, { useEffect, useState } from "react";
import { getAdresses } from "../services/direccionesService";
import { Direcciones } from "../models/direcciones";
import { Table, Button, Drawer, Form, Input, InputNumber } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaDireccion: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<Direcciones[]>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
    <Button type="primary" onClick={showDrawer}>
        Agregar Direccion
      </Button>
      <Table
        columns={columns}
        dataSource={direction}
      />
      <Drawer title="Agregar Direccion" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
          <Form.Item label="Codigo postal" name="codigo_postal">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Colonia" name="colonia">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Numero Exterior" name="num_ext">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Numero Interior" name="num_int">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Ciudad" name="ciudad">
            <Input></Input>
          </Form.Item>
        </form>
      </Drawer>
    </>
  );
}

export default TablaDireccion;