import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productsRoute.js';
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
app.use(express.json())
dotenv.config();

connectDB();

app.get('/', (req, res) => {
  res.send('api is running ............');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server is running on ${process.env.NODE_ENV} port ${PORT}`)
);
