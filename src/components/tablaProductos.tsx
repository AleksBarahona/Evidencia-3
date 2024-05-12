import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productosService";
import { Productos } from "../models/productos";
import { Table, Button, Drawer, Form, Input, InputNumber } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaProductos: React.FC = () => {
  const [products, setProducts] = useState<Productos[]>([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'ID_Producto',
      dataIndex: 'id_producto',
      key: 'id_Producto',

    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },

    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },

    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    },

    {
      title: 'fk_categoria',
      dataIndex: 'fk_categoria',
      key: 'fk_categoria',
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
        Agregar Producto
      </Button>
      <Table
        columns={columns}
        dataSource={products}
      />
      <Drawer title="Agregar Producto" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
          <Form.Item label="Nombre" name="nombre">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Categoria" name="categoria">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Precio" name="precio">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
        </form>
      </Drawer>
    </>
  );
}

export default TablaProductos;