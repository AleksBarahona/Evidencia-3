import React, { useEffect, useState } from "react";
import { getProductSessions } from "../services/sesionesProductosService";
import { SesionesProductos } from "../models/sesiones_productos";
import { Table, Button, Drawer, Form, InputNumber } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaSesionesProductos: React.FC = () => {
  const [session_product, setSessionProduct] = useState<SesionesProductos[]>([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchSessionProduct = async () => {
      try {
        const session_product = await getProductSessions();
        setSessionProduct(session_product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSessionProduct();
  }, []);

  const columns = [
    {
      title: 'fk_sesion',
      dataIndex: 'fk_sesion',
      key: 'fk_sesion',
      
    },
    {
      title: 'fk_producto',
      dataIndex: 'fk_producto',
      key: 'fk_producto',
    },
    
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    }
  ];

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Agregar Sesion de Producto
      </Button>
      <Table
        columns={columns}
        dataSource={session_product}
      />
  <Drawer title="Agregar Producto" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
        <Form.Item label="Fk_Sesion" name="fk_sesion">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Fk_producto" name="fk_producto">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Cantidad" name="cantidad">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
        </form>
      </Drawer>
    </>
  );
}

export default TablaSesionesProductos;