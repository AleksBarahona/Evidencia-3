import { Space, Typography } from 'antd'
import React from 'react'
import TablaDireccion from '../../../components/tablaDirecciones'



const DireccionesCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>Direcciones</Typography.Title>
        
            <TablaDireccion />
        
    </Space>
  )
}

export default DireccionesCollections