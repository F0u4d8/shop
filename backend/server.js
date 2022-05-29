import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productsRoute.js';
import uploadRoutes  from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import path from 'path'

import morgan from 'morgan';


const app = express();
if(process.env.NODE_ENV == 'developement'){


  app.use(morgan('dev'))
}
app.use(express.json())
dotenv.config();

connectDB();

app.get('/', (req, res) => {
  res.send('api is running ............');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('api/request' , requestRoutes)


const __dirname = path.resolve()
app.use('/uploads' , express.static(path.join(__dirname ,'/uploads')))
app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server is running on ${process.env.NODE_ENV} port ${PORT}`)
);
