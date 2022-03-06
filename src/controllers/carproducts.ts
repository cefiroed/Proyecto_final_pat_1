import {Request, Response, NextFunction} from 'express';
import { productsCarAPI } from '../apis/productscar';

class CarProduct {

  async checkProductCarExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const product = await productsCarAPI.getProducts(id);
    
    if (product.length < 1) {
      return res.status(400).json({
        error: 'No products loaded',
      });
    }

    if (!product) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
    next();
  }

  async checkAddProductCar(req: Request, res: Response, next: NextFunction) {

    const { product_id } = req.body;

    if (!product_id || typeof product_id !== 'string') { 
      return res.status(400).json({
        msg: 'Invalid body fields',
      });
    }

    next();
  }
  
  async getProductsCar (req : Request, res : Response) {

    const { id } = req.params;
    const { product } = req.query;
    if (id) {
      const result = await productsCarAPI.getProducts(id);
      if (!result.length)
        return res.status(404).json({
          data: 'OBJECT NOT FOUND',
        });

      return res.json({
        data: result,
      });
    }

    res.json({
      data: await productsCarAPI.getProducts(),
    });
    
  }
  

  async addProductsCar (req : Request, res : Response) {  

    const body = req.body;
    const product = await productsCarAPI.addProduct(body);

    res.json({
      listCart: 'List the cart',
      product,
    });
      
  }

  async deleteProductsCar (req : Request, res : Response) {
    const id = req.params.id;

    await productsCarAPI.deleteProduct(id);
    res.json({
      msg: "Product deleted",
    })
  }
}


export const carProductsController = new CarProduct();