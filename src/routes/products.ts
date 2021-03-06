import {Router} from 'express';
import { productsController } from '../controllers/products';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';


const router = Router();

router.get(
    '/:id?',productsController.checkProductExists, 
    productsController.getProducts
);

router.post(
    '/',checkAdmin, productsController.checkAddProducts, 
    asyncHandler(productsController.addProducts)
);

router.put(
    '/:id',checkAdmin, productsController.checkProductExists, 
    asyncHandler(productsController.updateProducts)
);

router.delete(
    '/:id',checkAdmin, productsController.checkProductExists, 
    asyncHandler(productsController.deleteProducts)
);


export default router;