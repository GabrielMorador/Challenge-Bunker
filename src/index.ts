import app from './app';
import dotenv from 'dotenv';
import { connectRabbitMQ } from './events/rabbitMQConnection';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectRabbitMQ();
});
