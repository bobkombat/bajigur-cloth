if (process.env.NODE_ENV != "prod")
  require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler.js');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

if (process.env.NODE_ENV != "test")
  app.listen(PORT, () => console.log(`listening at port ${PORT}`));

module.exports = app;
