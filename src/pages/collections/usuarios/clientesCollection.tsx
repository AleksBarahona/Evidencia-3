import { Space, Typography } from 'antd'
import React from 'react'
import TablaCliente from '../../../components/tablaClientes'



const ClientesCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>Clientes</Typography.Title>
        
            <TablaCliente />
        
    </Space>
  )
}

export default ClientesCollections