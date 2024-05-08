import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home"
import Collections from "../pages/collections/Collections";
import UsuariosCollections from "../pages/collections/usuarios/usuariosCollection";
import CategoriasCollections from "../pages/collections/usuarios/categoriasCollection";
import ClientesCollections from "../pages/collections/usuarios/clientesCollection";
import DireccionesCollections from "../pages/collections/usuarios/direccionesCollection";
import GenerosCollections from "../pages/collections/usuarios/generosCollection";
import ProductosCollections from "../pages/collections/usuarios/productosCollection";
import SesionesCollections from "../pages/collections/usuarios/sesionesCollection";
import SesionesProductosCollections from "../pages/collections/usuarios/sesionesProductosCollection";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <Home /> },
			{
				path: "collections",
				element: <Collections />,
				children: [
          { path: "usuarios", element: <UsuariosCollections /> },
		  { path: "categorias", element: <CategoriasCollections /> },
		  { path: "clientes", element: <ClientesCollections /> },
		  { path: "direcciones", element: <DireccionesCollections /> },
		  { path: "generos", element: <GenerosCollections /> },
		  { path: "productos", element: <ProductosCollections /> },
		  { path: "sesiones", element: <SesionesCollections /> },
		  { path: "sesiones_productos", element: <SesionesProductosCollections /> }
        ],
			},
		],
	},
]);