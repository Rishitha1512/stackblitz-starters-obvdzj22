const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3010;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/marketplace')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const authRoutes = require('./routes/route');
app.use('/api/auth', authRoutes);


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
