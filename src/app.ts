import express from 'express';
import routes from './rutas/index';

import { CONFIG } from './config';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.listen(CONFIG.APP_PORT, () => {
  console.log(`Corriendo en el puerto ${CONFIG.APP_PORT}`);
});
