import { randomUUID } from 'node:crypto';
import type { EventoDto } from './evento.dto.js';
import { TOPICS } from './topics.js';

/**
 * Convierte un evento en el mensaje completo que se enviará a Kafka.
 */
export function aMensaje(evento: EventoDto, correlationId: string = randomUUID()) {
  return {
    topic: TOPICS.prestamos,
    key: evento.usuarioSub,
    value: JSON.stringify(evento),
    headers: {
      'x-evento-id': evento.eventoId,
      'x-correlation-id': correlationId,
      'content-type': 'application/json',
    },
  };
}