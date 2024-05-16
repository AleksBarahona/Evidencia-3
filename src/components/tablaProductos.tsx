import React, { useEffect, useState } from "react";
import { createProducto, getProducts } from "../services/productosService";
import { Productos } from "../models/productos";
import { Table, Button, Drawer, Form, Input, InputNumber } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaProductos: React.FC = () => {
  const [products, setProducts] = useState<Productos[]>([]);
  const [open, setOpen] = useState(false);
  const [descripcion, setNombre] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [precio, setPrecio] = useState<number | undefined>();

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("productos")
        .select("id_productos")
        .order("id_productos", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_productos || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de categoria con el nuevo ID
      const productoInput: Productos = {
        id_productos: newId,
        descripcion,
        precio: 1500,
        fk_categoria: 1,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createProducto(productoInput);
  
      const updateProducto = await getProducts();
      setProducts(updateProducto);
      onClose();
    } catch (error) {
      console.error("Error creating producto:", error);
    }
  };

  const columns = [
    {
      title: 'ID_Producto',
      dataIndex: 'id_productos',
      key: 'id_Productos',

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
      <Drawer title="Agregar Producto" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <form>
          <Form.Item label="Descripcion" name="descripcion">
            <Input value={descripcion} onChange={(e) => setNombre(e.target.value)}></Input>
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