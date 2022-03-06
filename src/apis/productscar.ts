import { newProductCarI, ProductCarI } from '../models/car/productscar.interface';
import { NewFactoryCarDAO } from '../models/car/productscar.factory';
import { TypePersistence } from '../models/car/productscar.factory';


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

  async deleteProduct(id: string) {
    return await this.products.delete(id);
  }
}
  
export const productsCarAPI = new prodAPI();