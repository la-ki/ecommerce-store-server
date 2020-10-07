const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// ROUTES
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
// Enviroment Variables
env.config();

// MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.4ze0z.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log('Database connected successfuly');
    }).catch((err) => {
        console.log('Error', err);
    });

 
// parse application/json
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', authRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})