import { Space, Typography } from 'antd'
import React from 'react'
import TablaGenero from '../../../components/tablaGeneros'



const GenerosCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>Generos</Typography.Title>
        
            <TablaGenero />
        
    </Space>
  )
}

export default GenerosCollections