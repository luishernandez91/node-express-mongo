require('dotenv').config();

const express = require('express');
const {dbConnection} = require("./database/config");
const cors = require('cors');
// Create server
const app = new express();
// Cors configuration
app.use(cors());
// Body parsing
app.use(express.json());
// Database connection
dbConnection();
// Routes definition
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));

app.listen(process.env.PORT, () => {
    console.log('Server running at port ', process.env.PORT);
});
