const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Transport Management System API ');
  });
  
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
