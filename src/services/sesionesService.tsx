import { Sesiones } from "../models/sesiones";
import supabase from "../utils/supabase";

export const getSessions = async (): Promise<Sesiones[]> => {
    const { data, error } = await supabase.from("sesiones").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("sesiones:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }