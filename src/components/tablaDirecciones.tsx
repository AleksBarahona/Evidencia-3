import React, { useEffect, useState } from "react";
import { getAdresses, createDireccion } from "../services/direccionesService";
import { Direcciones } from "../models/direcciones";
import { Table, Button, Drawer, Form, Input, InputNumber } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaDireccion: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<Direcciones[]>([]);
  const [codigo_postal, setCP] = useState<number | undefined>(undefined);
  const [calle, setCalle] = useState<string>('');
  const [colonia, setColonia] = useState<string>('');
  const [num_ext, setNumExt] = useState<number | null>(null);
  const [num_int, setNumInt] = useState<number | 0>();
  const [ciudad, setCiudad] = useState<string>('');

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

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("direcciones")
        .select("id_direccion")
        .order("id_direccion", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_direccion || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de direccion con el nuevo ID
      const direccionInput: Direcciones = {
        id_direccion: newId,
        codigo_postal: 1,
        calle,
        colonia,
        num_ext: 1,
        num_int: 1,
        ciudad,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createDireccion(direccionInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateDireccion = await getAdresses();
      setDirection(updateDireccion);
      onClose();
    } catch (error) {
      console.error("Error creating cliente:", error);
    }
  };

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
      <Drawer title="Agregar Cliente" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <form>
          <Form.Item label="Codigo postal" name="codigo_postal">
            <InputNumber min={0} step={0.01} value={codigo_postal}/>
          </Form.Item>
          <Form.Item label="Calle" name="calle">
            <Input value={calle} onChange={(e) => setCalle(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="Colonia" name="colonia">
            <Input value={colonia} onChange={(e) => setColonia(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="Numero Exterior" name="num_ext">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Numero Interior" name="num_int">
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Ciudad" name="ciudad">
            <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)}></Input>
          </Form.Item>
        </form>
      </Drawer>
    </>
  );
}

export default TablaDireccion;