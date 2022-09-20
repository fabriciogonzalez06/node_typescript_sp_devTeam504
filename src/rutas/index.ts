import express from 'express';

import clientesRutas from './clientes.rutas';

const app = express();

app.use('/v1/clientes', clientesRutas);

export default app;
