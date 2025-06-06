export const formatearCantidad = cantidad => {
   return Number(cantidad).toLocaleString('es-US', {
      style: 'currency',
      currency: 'USD',
    })
}

export const generarId = () => {
   const fecha = Date.now().toString(36);
   const random = Math.random().toString(36).substring(2, 10);
   return random + fecha
}

export const formatearFecha = fecha => {
   const nuevaFecha = new Date(fecha);
   return new Intl.DateTimeFormat('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' }).format(nuevaFecha)
}