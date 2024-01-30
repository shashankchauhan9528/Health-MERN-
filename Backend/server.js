const express = require('express');
const app = express();
const port = 8000;
const dotenv = require('dotenv');

dotenv.config();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.js');
const db = require("./db.js");
const authRouter = require('./routes/AuthRoute.js');
const apoinment = require('./routes/Appointment.js')
const cors = require('cors');


// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});
app.use('/', authRouter);
app.use('/apoinment' , apoinment)


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});