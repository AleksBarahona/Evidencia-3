import React, { useEffect, useState } from "react";
import { getSessions } from "../services/sesionesService";
import { Sesiones } from "../models/sesiones";
import { Table, Button, Drawer, Form, Input, Select, DatePicker } from "antd";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaSesiones: React.FC = () => {
  const [session, setSessions] = useState<Sesiones[]>([]);
  const [open, setOpen] = useState(false);
  const [fecha_sesion, setFecha] = useState<Date | undefined>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSessions();
        setSessions(session);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSession();
  }, []);

  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("sesiones")
        .select("id_sesion")
        .order("id_sesion", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.id_sesion || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de categoria con el nuevo ID
      const sesionInput: Sesiones = {
        id_sesion: newId,
        fecha_sesion,
        apellido,
        fecha_nac,
        fk_genero: 1,
        telefono,
        correo,
        fk_direccion: 1,
        fecha_creacion: currentDateTime,
        fecha_actualizacion: currentDateTime,
        fk_creado_por: 1,
        fk_actualizado_por: 1,
      };
  
      // Insertar el nuevo registro en la base de datos
      await createCliente(clienteInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updateCliente = await getCustomers();
      setCliente(updateCliente);
      onClose();
    } catch (error) {
      console.error("Error creating cliente:", error);
    }
  };

  const columns = [
    {
        title: 'ID_Sesion',
        dataIndex: 'id_sesion',
        key: 'id_sesion',
        
      },
      {
        title: 'Fecha_Sesion',
        dataIndex: 'fecha_sesion',
        key: 'fecha_sesion',
      },
  
      {
        title: 'Hora_Sesion',
        dataIndex: 'hora_sesion',
        key: 'hora_sesion',
      },
  
      {
        title: 'fk_cliente',
        dataIndex: 'fk_cliente',
        key: 'fk_cliente',
      },
  
      {
        title: 'fecha_venta',
        dataIndex: 'fecha_venta',
        key: 'fecha_venta',
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
        Agregar Sesion
      </Button>
      <Table
        columns={columns}
        dataSource={session}
      />
      <Drawer title="Agregar Sesion" onClose={onClose} open={open} footer={<DrawerFooter></DrawerFooter>}>
        <form>
        <Form.Item label="Fecha Sesion" name="fecha_sesion">
            <DatePicker />
          </Form.Item>
        </form>
      </Drawer>
    </>
  );
}

export default TablaSesiones;