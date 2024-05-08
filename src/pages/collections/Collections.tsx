import React from "react";
import { Space, Row, Card, Button, Typography } from "antd";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { toTitleCase } from "../../utils/stringFormater"

interface Collection {
	id: number;
	title: string;
	description: string;
	key: string;
}

interface CollectionsProps {}

const Collections: React.FC<CollectionsProps> = () => {
	
	const outlet = useOutlet();
	const collectionsData: Collection[] = [
		{
			id: 1,
			title: "usuarios",
			description: "Tabla de Usuarios",
			key: "usuarios",
		},
		{
			id: 2,
			title: "Categorias",
			description: "Tabla de categorias",
			key: "categorias",
		},
		{
			id: 3,
			title: "Clientes",
			description: "Tabla de clientes",
			key: "clientes",
		},
		{
			id: 4,
			title: "Direcciones",
			description: "Tabla de direcciones",
			key: "direcciones",
		},
		{
			id: 5,
			title: "Generos",
			description: "Tabla de generos",
			key: "generos",
		},
		{
			id: 6,
			title: "Productos",
			description: "Tabla de productos",
			key: "productos",
		},
		{
			id: 7,
			title: "Sesiones",
			description: "Tabla de sesiones",
			key: "sesiones",
		},
		{
			id: 8,
			title: "Sesiones_Productos",
			description: "Tabla de sesiones de los productos",
			key: "sesiones_productos",
		},
	];

	if (!outlet) {return (
		<>
			<Typography.Title>Colecciones</Typography.Title>
			<Space direction="vertical" size={20}>
				<Row gutter={16}>
					{collectionsData.map((collection) => (
						<Space key={collection.id} direction="vertical">
							<Card
								title={toTitleCase(collection.title)}
								extra={
									<Button type="primary">
										<Link to={`/collections/${collection.key}`}>Ver</Link>
									</Button>
								}
								style={{ width: 300 }}
							>
								{collection.description}
							</Card>
						</Space>
					))}
				</Row>
			</Space>
			
		</>
	);}
	return <Outlet/>
};

export default Collections;