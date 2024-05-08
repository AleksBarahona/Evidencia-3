import { Productos } from "../models/productos";
import supabase from "../utils/supabase";

export const getProducts = async (): Promise<Productos[]> => {
    const { data, error } = await supabase.from("productos").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("Products:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }