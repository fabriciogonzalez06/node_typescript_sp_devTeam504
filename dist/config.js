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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const envPath = path_1.default.join(__dirname, '..', `.env`);
if (envPath) {
    dotenv.config({ path: envPath });
}
else {
    dotenv.config();
}
const validarVariableDeEntorno = (nombre) => {
    const valor = process.env[nombre];
    if (!valor) {
        throw new Error(`La variable de entorno ${nombre} es requerida`);
    }
    return valor;
};
exports.CONFIG = {
    APP_PORT: validarVariableDeEntorno('PORT') || process.env.PORT,
    DB_HOST: validarVariableDeEntorno('DB_HOST'),
    DB_USER: validarVariableDeEntorno('DB_USER'),
    DB_PASSWORD: validarVariableDeEntorno('DB_PASSWORD'),
    BD_DATABASE: validarVariableDeEntorno('DB_DATABASE'),
    DB_PORT: validarVariableDeEntorno('DB_PORT')
};
