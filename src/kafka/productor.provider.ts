import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Producer, ProduceAcks, compatibilityPartitioner, stringSerializers } from '@platformatic/kafka';

export const PRODUCTOR = 'PRODUCTOR_KAFKA';
export type ProductorKafka = Producer<string, string, string, string>;

export const productorProvider: Provider = {
  provide: PRODUCTOR,
  inject: [ConfigService],
  useFactory: (config: ConfigService): ProductorKafka =>
    new Producer({
      clientId: 'biblioteca-prestamos',
      bootstrapBrokers: config.getOrThrow<string>('KAFKA_BROKERS').split(','),
      serializers: stringSerializers,
      idempotent: true,
      acks: ProduceAcks.ALL,
      retries: 10,
      partitioner: compatibilityPartitioner,
      autocreateTopics: false,
    }),
};