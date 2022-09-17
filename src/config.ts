import path from 'path';
import * as dotenv from 'dotenv';

const envPath = path.join(__dirname, '..', `.env`);

if (envPath) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const validarVariableDeEntorno = (nombre: string) => {
  const valor = process.env[nombre];

  if (!valor) {
    throw new Error(`La variable de entorno ${nombre} es requerida`);
  }

  return valor;
};

export const CONFIG = {
  APP_PORT: validarVariableDeEntorno('PORT') || process.env.PORT,
  DB_HOST: validarVariableDeEntorno('DB_HOST'),
  DB_USER: validarVariableDeEntorno('DB_USER'),
  DB_PASSWORD: validarVariableDeEntorno('DB_PASSWORD'),
  BD_DATABASE: validarVariableDeEntorno('DB_DATABASE'),
  DB_PORT: validarVariableDeEntorno('DB_PORT')
};
