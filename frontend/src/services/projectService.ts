import { supabase } from "@/lib/supabase";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Project[];
}
