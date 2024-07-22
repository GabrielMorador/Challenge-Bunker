import express from 'express';
import campaignRoutes from './routes/campaignRoutes';
import interactionRoutes from './routes/interactionRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/campaigns', campaignRoutes);
app.use('/api/interactions', interactionRoutes);
app.use(errorHandler);

export default app;
