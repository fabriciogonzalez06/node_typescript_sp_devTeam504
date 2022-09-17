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

  async Ejecutar(procedimiento: string, parametros: any[] = []): Promise<sql.IProcedureResult<any>> {
    return new Promise(async (resolve, reject) => {
      let pool!: sql.ConnectionPool;

      try {
        pool = await new sql.ConnectionPool(this.config).connect();
      } catch (error) {
        reject(new HttpRespuestaError('No se puedo conectar a la db', 400));
      }

      const consulta = pool.request();

      parametros.forEach(function (elemento) {
        consulta.input(elemento.nombre, elemento.tipo, elemento.valor);
      });

      let respuesta: sql.IProcedureResult<any>;

      try {
        respuesta = await consulta.execute(procedimiento);
        resolve(respuesta);
      } catch (error) {
        console.log('ERROR EJECUTAR SP', error.message);
        reject(new HttpRespuestaError('No se pudo ejecutar la consulta', 400));
      } finally {
        pool.close();
      }
    });
  }
}

export default Conexion;
