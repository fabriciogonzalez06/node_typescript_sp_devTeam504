import * as sql from 'mssql';
import { CONFIG } from '../config';
import { HttpRespuestaError } from '../utilidades/httpRespuestaError';

class Conexion {
  public config: sql.config;

  constructor() {
    this.config = {
      user: CONFIG.DB_USER,
      password: CONFIG.DB_PASSWORD,
      database: CONFIG.BD_DATABASE,
      server: CONFIG.DB_HOST,
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

  async Ejecutar(procedimiento: string, parametros: any[] = []): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let pool!: sql.ConnectionPool;

      try {
        pool = await new sql.ConnectionPool(this.config).connect();
      } catch (error) {
        console.log('ERROR EJECUTAR SP', error.message);
        reject(new HttpRespuestaError('No se puedo conectar a la db', 500));
        return;
      }

      try {
        const consulta = pool.request();

        parametros.forEach(function (elemento) {
          consulta.input(elemento.nombre, elemento.tipo, elemento.valor);
        });

        let respuesta: sql.IProcedureResult<any>;

        const { returnValue, recordset } = await consulta.execute(procedimiento);

        switch (returnValue) {
          case 0:
            console.log('ERROR CONTROLADO EJECUTAR SP', recordset[0]);
            reject(new HttpRespuestaError(recordset[0].mensaje || 'No se pudo ejecutar la consulta', 400));
            break;
          case 1:
            resolve(recordset);
            break;
          case -1:
            console.log('ERROR NO CONTROLADO EJECUTAR SP', recordset[0]);
            reject(new HttpRespuestaError('No se pudo ejecutar la consulta, ocurrio un error interno'));
            break;

          default:
            resolve(recordset);
            break;
        }
      } catch ({ message, statusCode = 500 }) {
        console.log('ERROR EJECUTAR SP', message);
        reject(new HttpRespuestaError(message, statusCode));
      } finally {
        if (pool && typeof pool.close === 'function') {
          pool.close();
        }
      }
    });
  }
}

export default Conexion;
