import amqp, { Connection, Channel } from 'amqplib/callback_api';

const emitInteractionEvent = (interaction: any): void => {
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
        const msg = JSON.stringify(interaction);

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(`Sent: ${msg}`);
      });

      setTimeout(() => {
        connection.close();
      }, 500);
    },
  );
};

export { emitInteractionEvent };
