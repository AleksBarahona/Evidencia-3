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

  export const createDireccion = async (direccion: Direcciones): Promise<void> => {
    const { error} = await supabase.from("direcciones").insert(direccion);
    if (error) throw error;
  }