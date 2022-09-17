import express from 'express';

import saludarRuta from './hola.ruta';

const app = express();

app.use('/v1/prueba', saludarRuta);

export default app;
