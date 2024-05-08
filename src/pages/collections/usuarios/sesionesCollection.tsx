import { Space, Typography } from 'antd'
import React from 'react'
import TablaSesiones from '../../../components/tablaSesiones'



const SesionesCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>Sesiones</Typography.Title>
        
            <TablaSesiones />
        
    </Space>
  )
}

export default SesionesCollections