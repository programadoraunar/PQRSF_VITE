/**
 * @file utils.js
 * @description Este archivo contiene funciones utilitarias que pueden ser reutilizadas en los componentes del admin y dependencia.
 * Actualmente incluye una función para manejar la descarga de archivos adjuntos desde el almacenamiento de Supabase.
 */

import { toast } from 'react-hot-toast';
import { supabase } from './supabaseClient'; // Asegúrate de ajustar la ruta a tu configuración de Supabase

/**
 * Maneja la descarga de un archivo adjunto desde Supabase Storage.
 *
 * @async
 * @function
 * @param {string} url - La URL del archivo adjunto a descargar.
 * @returns {Promise<void>} - No retorna ningún valor. Inicia la descarga del archivo o muestra una notificación si no hay archivo.
 * @throws {Error} - Lanza un error si la descarga del archivo falla.
 * 
 * @example
 * handleDescargarAdjunto('ruta/del/archivo')
 *   .then(() => console.log('Archivo descargado exitosamente'))
 *   .catch(err => console.error('Error al descargar el archivo:', err));
 */
export const handleDescargarAdjunto = async url => {
    console.log(url);
    const { data } = supabase.storage.from('archivos').getPublicUrl(url);
    console.log(data);
    // Verificar si la URL contiene "null"
    if (data.publicUrl.includes('/null')) {
        toast('Sin archivo adjunto!', {
            description: 'La solicitud no contiene un archivo adjunto',
            duration: 5000,
            position: 'bottom-center',
            unstyled: true,
            classNames: {
                toast: 'bg-[#FDF7E5] p-4 text-black font-gothicRegular rounded-lg border-l-4 border-[#FF5733]',
                title: 'text-xl font-gothicBold',
            },
        });
        console.log('No hay archivo adjunto.');
        return;
    }
    // Construir la URL de descarga con el parámetro ?download
    const downloadUrl = `${data.publicUrl}?download=${url}`;
    console.log(downloadUrl);

    // Crear un enlace temporal y hacer clic en él para iniciar la descarga
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'adjunto_pqrsf'); // Especificar el nombre de descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
