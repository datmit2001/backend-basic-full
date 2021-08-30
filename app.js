import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import cors from 'cors';
//Config
const app = express();
dotenv.config();
app.use(bodyParser.json());
//Connection
//
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
//
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Database connected`)
});
mongoose.connection.on('Error', err => {
    console.log(`Data connect failed, ${err.message}`);
})

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors({ credentials: 'same-origin' }));



//Routes
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port', port)
})