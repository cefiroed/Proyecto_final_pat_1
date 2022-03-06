import fs from 'fs';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import {
  newProductCarI,
  ProductCarI,
  ProductCarBaseClass
} from '../productscar.interface';


const timeStamp = moment().format();

export class ProductsCarFSDAO implements ProductCarBaseClass {
  private products: ProductCarI[] = [];
  private nameFile: string;

  constructor(fileName: string) {
    
    this.nameFile = fileName;
    this.products = [];
    this.guardar();
  }

  async leer(file: string): Promise<void> {
    this.products = JSON.parse(await fs.promises.readFile(file, 'utf-8'));
  }

  async guardar(): Promise<void> {
    await fs.promises.writeFile(
      this.nameFile,
      JSON.stringify(this.products, null, '\t')
    );
  }
  

  async findIndex(id: string): Promise<number> {
    await this.leer(this.nameFile);
    return this.products.findIndex((aProduct: ProductCarI) => aProduct._id == id);
  }

  async find(id: string): Promise<ProductCarI | undefined> {
    await this.leer(this.nameFile);

    return this.products.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductCarI[]> {
    await this.leer(this.nameFile);

    if (id) {
      return this.products.filter((aProduct) => aProduct._id === id);
    }
    return this.products;
  }

  async add(data: newProductCarI): Promise<ProductCarI> {
    // if (!data.product) throw new Error('invalid data');

    await this.leer(this.nameFile);

    // const newItem: ProductCarI = {
    //   _id: (this.products.length + 1).toString(),
    //   timestamp: timeStamp,
    //   productid: uuidv4(),
    // };

    const newItem: ProductCarI = {
      _id: (this.products.length + 1).toString(),
      timestamp: timeStamp,
      // product: (this.products.length +1).toString() ,
      product: (this.products).toString(),
    }

    this.products.push(newItem);

    await this.guardar();

    return newItem;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nameFile);

    const index = await this.findIndex(id);
    this.products.splice(index, 1);
    await this.guardar();
  }
}


