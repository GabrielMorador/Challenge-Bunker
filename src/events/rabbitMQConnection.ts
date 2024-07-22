import amqp, { Connection, Channel } from 'amqplib/callback_api';
import { handleInteraction } from './handlers/interactionHandler';

export function connectRabbitMQ(): void {
  amqp.connect(
    'amqp://rabbitmq',
    (error0: Error | null, connection: Connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1: Error | null, channel: Channel) => {
        if (error1) {
          throw error1;
        }
        const queue = 'interactions_queue';

        channel.assertQueue(queue, {
          durable: false,
        });

        console.log(`Waiting for messages in ${queue}`);
        channel.consume(
          queue,
          (msg) => {
            if (msg) {
              console.log(`Received: ${msg.content.toString()}`);
              // proccess message
              handleInteraction(JSON.parse(msg.content.toString()));
            }
          },
          {
            noAck: true,
          },
        );
      });
    },
  );
}
