const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');
require('dotenv').config();

const app = express();
 
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
