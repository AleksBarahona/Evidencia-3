import { Usuarios } from "../models/usuarios";
import supabase from "../utils/supabase";

export const getUsers = async (): Promise<Usuarios[]> => {
  const { data , error} = await supabase.from("usuarios").select();
  if (error) throw error;
  return data
}