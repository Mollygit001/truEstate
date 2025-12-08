const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const salesRoutes = require('./routes/salesRoutes');

// Routes
app.use('/api/sales', salesRoutes);
app.get('/', (req, res) => {
  res.send('Retail Sales Management API is running');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://zama:zamaboy@cluster0.efjqdft.mongodb.net/retail_sales1', {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
