const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const weatherRoutes = require('./routes/weatherRoutes');
const { PORT } = require('./config/env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 