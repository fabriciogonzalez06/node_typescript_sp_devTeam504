export class HttpRespuestaError extends Error {
  statusCode: number;
  constructor(message = 'Error interno de servidor', statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
