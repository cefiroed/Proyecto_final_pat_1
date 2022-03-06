import moment from 'moment';
import {
  newProductCarI,
  ProductCarI,
  ProductCarBaseClass,
} from '../productscar.interface';

const timeStamp = moment().format();

export class ProductsCarMemDAO implements ProductCarBaseClass {
  private products: ProductCarI[] = [];

  constructor() {
    
  }

  findIndex(id: string) {
    return this.products.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): ProductCarI | undefined {
    return this.products.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductCarI[]> {
    if (id) {
      return this.products.filter((aProduct) => aProduct._id === id);
    }
    return this.products;
  }

  async add(data: newProductCarI): Promise<ProductCarI> {
    // if (!data.product) throw new Error('invalid data');

    const newItem: ProductCarI = {
      _id: (this.products.length + 1).toString(),
      timestamp: timeStamp,
      productid: uuidv4(),
    };

    this.products.push(newItem);

    return newItem;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.products.splice(index, 1);
  }
}

function uuidv4(): string {
  throw new Error('Function not implemented.');
}

