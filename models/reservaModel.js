class Reserva {
  constructor(id, hotel, tipoHabitacion, numHuespedes, fechaInicio, fechaFin, estado) {
    this.id = id;
    this.hotel = hotel;
    this.tipoHabitacion = tipoHabitacion;
    this.numHuespedes = numHuespedes;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.estado = estado; // "confirmada", "pendiente", "cancelada"
  }
}

module.exports = Reserva;