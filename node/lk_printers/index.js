const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userroutes');
const cors=require('cors');
require('./src/config/db');
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend port
  credentials: true
}));
app.use('/api/user', userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
