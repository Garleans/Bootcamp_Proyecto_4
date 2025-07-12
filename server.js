require('dotenv').config();
const express = require('express');
const reservasRoutes = require('./routes/reservasRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig'); // Importa el objeto dinámico
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/reservas', reservasRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.send('API de Reservas Hotel 🏨 funcionando correctamente');
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});