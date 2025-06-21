const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const workOutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerDocument = YAML.load('./swagger.yaml');
require('dotenv').config();

const port = process.env.PORT || 4000;
const mongo = process.env.MONGO_URI;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/workouts', workOutRoutes);

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
