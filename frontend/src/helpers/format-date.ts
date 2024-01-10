export function formatDate(fechaISO: string) {
    // Crear un objeto Date con la fecha
    const fecha = new Date(fechaISO);

    // Utilizar toLocaleString() para formatear la fecha y la hora
    const formatoAmigable = fecha.toLocaleString();

    return formatoAmigable;
}