export const formatDateForTable = (recivedDate: string) => {
     const months = [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
     ];

     const date = new Date(recivedDate);
     const day = date.getDate();
     const month = months[date.getMonth()];
     const year = date.getFullYear();

     return `${day} de ${month}, ${year}`;
};
