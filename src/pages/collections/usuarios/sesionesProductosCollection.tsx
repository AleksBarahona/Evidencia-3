import { Space, Typography } from 'antd'
import React from 'react'
import TablaSesionesProductos from '../../../components/tablaSesionesProductos'



const SesionesProductosCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>Sesiones_Productos</Typography.Title>
        
            <TablaSesionesProductos />
        
    </Space>
  )
}

export default SesionesProductosCollections