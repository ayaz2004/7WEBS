const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Book Review Platform API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running!`);
});
