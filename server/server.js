require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connection/config')
const PORT = process.env.PORT || 8080;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/userRoutes'));
app.use('/login', require('./routes/loginRoutes'));

mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose');
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})

mongoose.connection.on('error', (err) => console.log(err))
