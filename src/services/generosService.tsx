import supabase from "../utils/supabase"
import { Generos } from "../models/generos";


export const getGenders = async (): Promise<Generos[]> => {
  const { data , error} = await supabase.from("generos").select();
  if (error) throw error;
  return data
}

export const createGenero = async (genero: Generos): Promise<void> => {
  const { error} = await supabase.from("generos").insert(genero);
  if (error) throw error;
}