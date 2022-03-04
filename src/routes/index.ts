import {Router} from 'express';
import productsRouter from './products';
import carRouter from './car';
import HandleError from '../controllers/handleerror'

const router = Router();

router.use('/products', productsRouter);
router.use('/car', carRouter);
router.use('*', HandleError.genericError)

export default router;