import { Categorias } from "../models/categorias";
import supabase from "../utils/supabase";

export const getCategories = async (): Promise<Categorias[]> => {
    const { data, error } = await supabase.from("categorias").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("categorias:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }

  export const createCategoria = async (categoria: Categorias): Promise<void> => {
    const { error} = await supabase.from("categorias").insert(categoria);
    if (error) throw error;
  }