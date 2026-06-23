const express = require('express');
const app = express();
require('dotenv').config();

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const crudRoutes = require('./routes/crud');

// API Routes
app.use('/api', crudRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
