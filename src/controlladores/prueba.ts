import { Request, Response } from 'express';

export const saludar = (req: Request, res: Response) => {
  res.status(200).send({ mensaje: 'Hola' });
};
