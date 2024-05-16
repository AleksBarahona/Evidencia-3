import React, { useEffect, useState } from "react";
import { createCategoria, getCategories } from "../services/categoriasService";
import { Categorias } from "../models/categorias";
import { Table, Button, Drawer, Form, Input } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaCategorias: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Categorias[]>([]);
  const [nombre, setNombre] = useState<string>('');

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("categorias")
        .select("id_categoria")
        .order("id_categoria", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_categoria || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de categoria con el nuevo ID
      const categoriaInput: Categorias = {
        id_categoria: newId,
        nombre,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createCategoria(categoriaInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateCategoria = await getCategories();
      setCategory(updateCategoria);
      onClose();
    } catch (error) {
      console.error("Error creating categoria:", error);
    }
  };

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
      <Drawer title="Agregar Categoria" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
      <Form onFinish={handleSubmit}>
          <Form.Item label='Nombre' name='nombre' rules={[{ required: true, message: 'Ingrese nombre de la categoria' }]}>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>

    </>
  );
}

export default TablaCategorias;