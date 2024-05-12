import React, { useEffect, useState } from "react";
import { getGenders } from "../services/generosService";
import { Generos } from "../models/generos";
import { Table, Button, Drawer, Form, Input } from "antd";
import DrawerFooter from "./DrawerFooter";

const TablaGenero: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState<Generos[]>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchGender = async () => {
      try {
        const gender = await getGenders();
        setGender(gender);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchGender();
  }, []);

  const columns = [
    {
        title: 'ID_Genero',
        dataIndex: 'id_genero',
        key: 'id_genero',
        
      },
      {
        title: 'Genero',
        dataIndex: 'genero',
        key: 'genero',
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
        Agregar Genero
      </Button>
      <Table
        columns={columns}
        dataSource={gender}
      />
      <Drawer title="Agregar Genero" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
          <Form.Item label="Genero" name="genero">
            <Input></Input>
          </Form.Item>
        
        </form>
      </Drawer>
    </>
  );
}

export default TablaGenero;