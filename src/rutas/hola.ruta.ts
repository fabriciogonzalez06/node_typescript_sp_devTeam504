import { Router } from 'express';
import { saludar } from '../controlladores/prueba';

const router = Router();

router.get('/', saludar);

export default router;
