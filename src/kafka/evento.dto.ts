import { Type } from 'class-transformer';
import { Equals, IsIn, IsISO8601, IsNotEmpty, IsString, IsUUID, Matches, ValidateIf, ValidateNested } from 'class-validator';

export const TIPOS = ['prestamo.creado', 'prestamo.devuelto'] as const;
export type TipoEvento = (typeof TIPOS)[number];

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export class DatosPrestamoCreadoDto {
  @IsString()
  @IsNotEmpty()
  prestamoId!: string;

  @Matches(FECHA, { message: 'desde tiene que ser una fecha AAAA-MM-DD' })
  @IsISO8601({ strict: true })
  desde!: string;

  @Matches(FECHA, { message: 'hasta tiene que ser una fecha AAAA-MM-DD' })
  @IsISO8601({ strict: true })
  hasta!: string;
}

export class DatosPrestamoDevueltoDto {
  @IsString()
  @IsNotEmpty()
  prestamoId!: string;
}

export class EventoDto {
  @IsUUID()
  eventoId!: string;

  @IsIn(TIPOS)
  tipo!: TipoEvento;

  @Equals(1, { message: 'version tiene que ser 1' })
  version!: number;

  @IsISO8601({ strict: true })
  emitidoEn!: string;

  @IsString()
  @IsNotEmpty()
  libroId!: string;

  @IsString()
  @IsNotEmpty()
  usuarioSub!: string;

  @ValidateIf((e: EventoDto) => TIPOS.includes(e.tipo))
  @ValidateNested()
  @Type((opciones) =>
    opciones?.object?.tipo === 'prestamo.devuelto' ? DatosPrestamoDevueltoDto : DatosPrestamoCreadoDto,
  )
  datos!: DatosPrestamoCreadoDto | DatosPrestamoDevueltoDto;
}