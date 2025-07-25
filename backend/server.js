const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  process.env.CLIENT_URL   
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

connectDB();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Book Review Platform API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running!`);
});
