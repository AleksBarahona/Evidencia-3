import React, { useEffect, useState } from "react";
import { getProductSessions } from "../services/sesionesProductosService";
import { Table } from "antd";
import { SesionesProductos } from "../models/sesiones_productos";

const TablaSesionesProductos: React.FC = () => {
  const [session_product, setSessionProduct] = useState<SesionesProductos[]>([]);

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
      <Table
        columns={columns}
        dataSource={session_product}
      />

    </>
  );
}

export default TablaSesionesProductos;