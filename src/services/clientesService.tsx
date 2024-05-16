import { Clientes } from "../models/clientes";
import supabase from "../utils/supabase";

export const getCustomers = async (): Promise<Clientes[]> => {
    const { data, error } = await supabase.from("clientes").select();
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("clientes:", data); // Agrega esta línea para imprimir los datos
    }
    return data || []; 
  }

  export const createCliente = async (cliente: Clientes): Promise<void> => {
    const { error} = await supabase.from("clientes").insert(cliente);
    if (error) throw error;
  }