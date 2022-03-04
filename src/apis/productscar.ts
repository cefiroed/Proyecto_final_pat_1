import { newProductCarI, ProductCarI } from '../models/car/productscar.interface';
import { NewFactoryCarDAO } from '../models/car/productscar.factory';
import { TypePersistence } from '../models/car/productscar.factory';
import { ProductCarQuery } from '../models/car/productscar.interface';


/**
 * with this variable we select the persistence type
 **/ 

const type = TypePersistence.FileSystem;

class prodAPI {
    private products;
  
    constructor() {
      this.products = NewFactoryCarDAO.get(type);
    }
  
    async getProducts(id: string | undefined = undefined): Promise<ProductCarI[]> {
      if (id) return this.products.get(id);
  
      return this.products.get();
    }
  
    async addProduct(productData: newProductCarI): Promise<ProductCarI> {
      const newProduct = await this.products.add(productData);
      return newProduct;
    }
  
    // async updateProduct(id: string, productData: newProductCarI) {
    //   const updatedProduct = await this.products.update(id, productData);
    //   return updatedProduct;
    // }
  
    async deleteProduct(id: string) {
      return await this.products.delete(id);
    }
  
    async query(options: ProductCarQuery) {
      return await this.products.query(options);
    }
}
  
export const productsCarAPI = new prodAPI();