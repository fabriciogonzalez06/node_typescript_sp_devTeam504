"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(require("mssql"));
const config_1 = require("../config");
const httpRespuestaError_1 = require("../utilidades/httpRespuestaError");
class Conexion {
    constructor() {
        this.config = {
            user: config_1.CONFIG.DB_USER,
            password: config_1.CONFIG.DB_PASSWORD,
            database: config_1.CONFIG.BD_DATABASE,
            server: config_1.CONFIG.DB_HOST,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: false,
                trustServerCertificate: false
            }
        };
    }
    Ejecutar(procedimiento, parametros = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let pool;
                try {
                    pool = yield new sql.ConnectionPool(this.config).connect();
                }
                catch (error) {
                    reject(new httpRespuestaError_1.HttpRespuestaError('No se puedo conectar a la db', 400));
                }
                const consulta = pool.request();
                parametros.forEach(function (elemento) {
                    consulta.input(elemento.nombre, elemento.tipo, elemento.valor);
                });
                let respuesta;
                try {
                    respuesta = yield consulta.execute(procedimiento);
                    resolve(respuesta);
                }
                catch (error) {
                    console.log('ERROR EJECUTAR SP', error.message);
                    reject(new httpRespuestaError_1.HttpRespuestaError('No se pudo ejecutar la consulta', 400));
                }
                finally {
                    pool.close();
                }
            }));
        });
    }
}
exports.default = Conexion;
