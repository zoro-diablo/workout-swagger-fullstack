require('dotenv').config();

const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { globalLimiter, loginLimiter } = require('./middleware/rateLimiter');
const workOutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const routeNotFound = require('./middleware/routeNotFound');

// Swagger YAML documentation
const swaggerDocument = YAML.load('./swagger.yaml');

const port = process.env.PORT || 4000;
const mongo = process.env.MONGO_URI;

const app = express();

// Secure HTTP headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse incoming JSON payloads
app.use(express.json());

// Global rate limiter
app.use(globalLimiter);

// Login route-specific rate limiter
app.use('/api/user/login', loginLimiter);

// Logger middleware
app.use(logger);

// Route handlers for API endpoints
app.use('/api/workouts', workOutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

// Route fallback
app.use(routeNotFound);

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Successfully connected to mongodb & Listening on port ${port}`
      );
      console.log(
        `Swagger docs available at http://localhost:${port}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
