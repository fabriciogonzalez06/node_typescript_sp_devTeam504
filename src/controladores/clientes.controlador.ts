import { Request, Response } from 'express';
import * as yup from 'yup';
import * as sql from 'mssql';

import Conexion from '../db/conexion';
import { IParametro } from '../interfaces/db.interfaz';

export const listarClientes = async (req: Request, res: Response) => {
  try {
    const conexion = new Conexion();

    const resultado = await conexion.Ejecutar('sp_clientes_listar');

    return res.status(200).send(resultado);
  } catch ({ message, statusCode = 500 }) {
    return res.status(statusCode).send({ mensaje: message });
  }
};

export const obtenerCliente = async (req: Request, res: Response) => {
  try {
    const conexion = new Conexion();

    const { id } = req.params;

    const parametros: IParametro[] = [
      {
        nombre: 'id_cliente',
        tipo: sql.VarChar,
        valor: id
      }
    ];

    const resultado = await conexion.Ejecutar('sp_cliente_obtener', parametros);

    if (resultado.length === 0) {
      return res.status(404).send({ mensaje: 'Cliente no encontrado' });
    }

    return res.status(200).send(resultado[0]);
  } catch ({ message, statusCode = 500 }) {
    return res.status(statusCode).send({ mensaje: message });
  }
};

const crearClienteEsquema = yup.object({
  nombres: yup.string().required().max(100).min(3),
  apellidos: yup.string().required().max(100).min(3),
  identidad: yup.string().required().max(20).min(13),
  direccion: yup.string().required().min(2).max(100)
});

export const crearCliente = async (req: Request, res: Response) => {
  try {
    await crearClienteEsquema.validate(req.body);
  } catch (error) {
    return res.status(400).send({ mensaje: error.message });
  }

  const { nombres, apellidos, identidad, direccion } = req.body;

  try {
    const conexion = new Conexion();

    const parametros: IParametro[] = [
      {
        nombre: 'nombres',
        tipo: sql.VarChar,
        valor: nombres
      },
      {
        nombre: 'apellidos',
        tipo: sql.VarChar,
        valor: apellidos
      },
      {
        nombre: 'identidad',
        tipo: sql.VarChar,
        valor: identidad
      },
      {
        nombre: 'direccion',
        tipo: sql.VarChar,
        valor: direccion
      }
    ];

    const resultado = await conexion.Ejecutar('sp_cliente_crear', parametros);

    return res.status(201).send(resultado[0]);
  } catch ({ message, statusCode = 500 }) {
    return res.status(statusCode).send({ mensaje: message });
  }
};

const actualizarClienteEsquema = yup.object({
  nombres: yup.string().required().max(100).min(3),
  apellidos: yup.string().required().max(100).min(3),
  identidad: yup.string().required().max(20).min(13)
});

export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    await actualizarClienteEsquema.validate(req.body);
  } catch (error) {
    return res.status(400).send({ mensaje: error.message });
  }

  const { nombres, apellidos, identidad } = req.body;
  const { id } = req.params;

  try {
    const conexion = new Conexion();

    const parametros: IParametro[] = [
      {
        nombre: 'id_cliente',
        tipo: sql.Int,
        valor: id
      },
      {
        nombre: 'nombres',
        tipo: sql.VarChar,
        valor: nombres
      },
      {
        nombre: 'apellidos',
        tipo: sql.VarChar,
        valor: apellidos
      },
      {
        nombre: 'identidad',
        tipo: sql.VarChar,
        valor: identidad
      }
    ];

    const resultado = await conexion.Ejecutar('sp_cliente_actualizar', parametros);

    return res.status(200).send(resultado[0]);
  } catch ({ message, statusCode = 500 }) {
    return res.status(statusCode).send({ mensaje: message });
  }
};

export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const conexion = new Conexion();

    const { id } = req.params;

    const parametros: IParametro[] = [
      {
        nombre: 'id_cliente',
        tipo: sql.VarChar,
        valor: id
      }
    ];

    const resultado = await conexion.Ejecutar('sp_cliente_eliminar', parametros);

    return res.status(204).send(resultado[0]);
  } catch ({ message, statusCode = 500 }) {
    return res.status(statusCode).send({ mensaje: message });
  }
};
