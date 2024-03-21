/**
 * Obtiene la sesión del usuario utilizando un cliente de Supabase para el lado del servidor.
 * Esta función desactiva el almacenamiento en caché antes de realizar la solicitud.
 * @returns La sesión del usuario, si está autenticado.
 */
import  {supabase} from "../client";
export default async function getUserSession() {
  // Obtiene la sesión del usuario utilizando el cliente de Supabase.
  return supabase.auth.getSession();
}
