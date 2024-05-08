import { SesionesProductos } from "../models/sesiones_productos";
import supabase from "../utils/supabase";

export const getProductSessions = async (): Promise<SesionesProductos[]> => {
    const { data, error } = await supabase.from("sesiones_productos").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("sesiones_productos:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }