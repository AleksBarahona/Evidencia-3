import React, { useEffect, useState } from "react";
import { createGenero, getGenders } from "../services/generosService";
import { Generos } from "../models/generos";
import { Table, Button, Drawer, Form, Input } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaGenero: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState<Generos[]>([]);
  const [genero, setGenero] = useState<string>('');

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("generos")
        .select("id_genero")
        .order("id_genero", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_genero || 0;
      const newId = maxId + 1;
  
     
      const generoInput: Generos = {
        id_genero: newId,
        genero,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
     
      await createGenero(generoInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateGenero = await getGenders();
      setGender(updateGenero);
      onClose();
    } catch (error) {
      console.error("Error creating genero:", error);
    }
  };



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
      <Drawer title="Agregar Genero" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <form>
          <Form.Item label="Genero" name="genero">
            <Input value={genero} onChange={(e) => setGenero(e.target.value)}></Input>
          </Form.Item>
        
        </form>
      </Drawer>
    </>
  );
}

export default TablaGenero;