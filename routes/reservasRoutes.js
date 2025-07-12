const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservasController');

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Endpoints para gestionar reservas hoteleras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       required:
 *         - hotel
 *         - tipoHabitacion
 *         - numHuespedes
 *         - fechaInicio
 *         - fechaFin
 *         - estado
 *       properties:
 *         id:
 *           type: string
 *           description: ID único (generado con librería uuid)
 *         hotel:
 *           type: string
 *           description: Nombre del hotel
 *         tipoHabitacion:
 *           type: string
 *           description: Tipo de habitación (Doble, Single, Premium)
 *         numHuespedes:
 *           type: integer
 *           description: Cantidad total de personas
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la reserva
 *         fechaFin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la reserva
 *         estado:
 *           type: string
 *           description: Estado de la reserva (pendiente, pagada, cancelada)
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 */
router.post('/', controller.crearReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Aplicar filtros para las reservas
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Nombre del hotel
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Tipo de habitación
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Estado de la reserva
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Número de personas
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del rango
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del rango
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', controller.obtenerReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva específica por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', controller.obtenerReservaPorId);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva existente
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', controller.actualizarReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', controller.eliminarReserva);

module.exports = router;
