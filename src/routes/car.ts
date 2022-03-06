import {Router} from 'express';
import { carProductsController } from '../controllers/carproducts';
import asyncHandler from 'express-async-handler';

const router = Router();

//Create a cart and return an id
router.post(
    '/', carProductsController.addProductsCar
);
//Empty a cart and delete it
router.delete(
    '/:id', carProductsController.checkProductCarExists,
    asyncHandler(carProductsController.deleteProductsCar)
);
//It allows me to list all the products saved in the cart
router.get(
    '/:id?',carProductsController.checkProductCarExists, 
    carProductsController.getProductsCar
);
//To add products to the cart by their product id
router.post(
    '/:id_prod', carProductsController.checkAddProductCar,
    asyncHandler(carProductsController.addProductsCar)
);
//Remove a product from the cart by its cart and product id
router.delete(
    '/:id/:id_prod', carProductsController.checkProductCarExists,
    asyncHandler(carProductsController.deleteProductsCar)
);

export default router;