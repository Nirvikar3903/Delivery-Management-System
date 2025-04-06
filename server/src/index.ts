import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import partnerRoutes from './routes/partners.routes';
import orderRoutes from './routes/orders.routes';
import assignmentRoutes from './routes/assignments.route';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/partners', partnerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assignments', assignmentRoutes);


