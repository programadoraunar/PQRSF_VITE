/**
 * @file dateUtils.js
 * @description Este archivo contiene funciones de utilidad para formatear fechas en una aplicación React.
 * Proporciona una función para convertir cadenas de fecha en formatos legibles, tanto con tiempo como sin tiempo.
 */

import { format } from 'date-fns';

/**
 * Formatea una cadena de fecha en un formato legible.
 *
 * Si la cadena de fecha incluye tiempo, se formateará en formato con tiempo.
 * Si la cadena de fecha no incluye tiempo, se formateará en formato sin tiempo.
 *
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} La fecha formateada en un formato legible.
 */
export const formatearFecha = dateString => {
  const date = new Date(dateString);

  // Verificar si la cadena de fecha incluye tiempo
  if (dateString.length > 10) {
    return format(date, 'PPpp'); // Formato con tiempo
  } else {
    return format(date, 'PP'); // Formato sin tiempo
  }
};
