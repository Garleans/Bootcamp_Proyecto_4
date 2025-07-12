const { v4: uuidv4 } = require('uuid');

let reservas = [];

// Crear reserva
const crearReserva = (req, res) => {
  const {
    hotel,
    tipoHabitacion,
    numHuespedes,
    fechaInicio,
    fechaFin,
    estado,
  } = req.body;

  const nuevaReserva = {
    id: uuidv4(),
    hotel,
    tipoHabitacion,
    numHuespedes,
    fechaInicio,
    fechaFin,
    estado,
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
};

// Obtener todas las reservas (con filtros)
const obtenerReservas = (req, res) => {
  const {
    hotel,
    tipo_habitacion,
    estado,
    num_huespedes,
    fecha_inicio,
    fecha_fin,
  } = req.query;

  let resultados = [...reservas];

  if (hotel) {
    resultados = resultados.filter(r =>
      r.hotel.toLowerCase().includes(hotel.toLowerCase())
    );
  }

  if (tipo_habitacion) {
    resultados = resultados.filter(
      r => r.tipoHabitacion.toLowerCase() === tipo_habitacion.toLowerCase()
    );
  }

  if (estado) {
    resultados = resultados.filter(
      r => r.estado.toLowerCase() === estado.toLowerCase()
    );
  }

  if (num_huespedes) {
    resultados = resultados.filter(
      r => r.numHuespedes === parseInt(num_huespedes)
    );
  }

  if (fecha_inicio && fecha_fin) {
    resultados = resultados.filter(r => {
      return (
        new Date(r.fechaInicio) >= new Date(fecha_inicio) &&
        new Date(r.fechaFin) <= new Date(fecha_fin)
      );
    });
  }

  res.json(resultados);
};

// Obtener una reserva específica
const obtenerReservaPorId = (req, res) => {
  const { id } = req.params;
  const reserva = reservas.find(r => r.id === id);
  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }
  res.json(reserva);
};

// Actualizar reserva
const actualizarReserva = (req, res) => {
  const { id } = req.params;
  const index = reservas.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  const {
    hotel,
    tipoHabitacion,
    numHuespedes,
    fechaInicio,
    fechaFin,
    estado,
  } = req.body;

  reservas[index] = {
    ...reservas[index],
    hotel,
    tipoHabitacion,
    numHuespedes,
    fechaInicio,
    fechaFin,
    estado,
  };

  res.json(reservas[index]);
};

// Eliminar reserva
const eliminarReserva = (req, res) => {
  const { id } = req.params;
  const index = reservas.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);
  res.json({ mensaje: 'Reserva eliminada correctamente' });
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,
};
