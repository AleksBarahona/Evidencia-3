import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoriasService";
import { Categorias } from "../models/categorias";
import { Table, Button, Drawer, Form, Input } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaCategorias: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Categorias[]>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories();
        setCategory(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategory();
  }, []);

  const columns = [
    {
        title: 'ID_Categoria',
        dataIndex: 'id_categoria',
        key: 'id_categoria',
        
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
      <Button type="primary" onClick={showDrawer}>
        Agregar Categoria
      </Button>
      <Table
        columns={columns}
        dataSource={category}
      />
      <Drawer title="Agregar Categoria" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
          <Form.Item label="Nombre de la categoria" name="nombre">
            <Input></Input>
          </Form.Item>
        
        </form>
      </Drawer>

    </>
  );
}

export default TablaCategorias;