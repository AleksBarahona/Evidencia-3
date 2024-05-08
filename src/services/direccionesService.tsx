import { Direcciones } from "../models/direcciones";
import supabase from "../utils/supabase";

export const getAdresses = async (): Promise<Direcciones[]> => {
    const { data, error } = await supabase.from("direcciones").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("direcciones:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }