import supabase from "../utils/supabase"
import { Generos } from "../models/generos";


export const getGenders = async (): Promise<Generos[]> => {
  const { data , error} = await supabase.from("generos").select();
  if (error) throw error;
  return data
}