import instance from "../config/axios";

const formatFecha = (fecha: Date): string => {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesDeFormato);
    return formatoFecha.format(fecha);
};

const applyForTheVacant = async (vacancyId: number, UserId: number) => {
    try {
        // Obtener la fecha actual y formatearla
        const fechaActual = new Date();

        // Convertir la fecha a formato ISO-8601
        const fechaISO8601 = fechaActual.toISOString();

        // Enviar la solicitud POST con la fecha en formato ISO-8601
        const { data } = await instance.post('/api/v1/applicants', {
            jobId: vacancyId,
            userId: UserId,
            date: fechaISO8601
        });

        return data;
    } catch (error) {
        throw error;
    }
};

export default applyForTheVacant;
