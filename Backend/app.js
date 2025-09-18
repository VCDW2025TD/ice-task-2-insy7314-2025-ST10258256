const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'https://localhost:3000', // Adjust as needed for your frontend
  credentials: true
}));
app.use(express.json());

// Sample route
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}`, timestamp: new Date()});
});

// app.get('/', (req, res) => {
//   res.send('App is running');
// });

// app.get('/test', (req, res) => {
//   res.json({ message: 'Test route is working' });
// });

module.exports = app;