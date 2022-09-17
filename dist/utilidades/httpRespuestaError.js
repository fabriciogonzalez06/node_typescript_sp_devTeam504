"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRespuestaError = void 0;
class HttpRespuestaError extends Error {
    constructor(message = 'Error interno de servidor', statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpRespuestaError = HttpRespuestaError;
