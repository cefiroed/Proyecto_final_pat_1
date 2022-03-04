import fs from 'fs';
import {
  newProductCarI,
  ProductCarI,
  ProductCarBaseClass,
  ProductCarQuery,
} from '../productscar.interface';


export class ProductsCarFSDAO implements ProductCarBaseClass {
  private products: ProductCarI[] = [];
  private nameFile: string;

  constructor(fileName: string) {
    
    this.nameFile = fileName;
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
    if (!data.name || !data.description || !data.codeproduct || !data.url || 
      !data.price || !data.stock) throw new Error('invalid data');

    await this.leer(this.nameFile);

    const newItem: ProductCarI = {
      _id: (this.products.length + 1).toString(),
      name: data.name,
      description: data.description,
      codeproduct: data.codeproduct,
      url: data.url,
      price: data.price,
      stock: data.stock
    };

    this.products.push(newItem);

    await this.guardar();

    return newItem;
  }

  async update(id: string, newProductData: newProductCarI): Promise<ProductCarI> {
    await this.leer(this.nameFile);

    const index = await this.findIndex(id);
    const oldProduct = this.products[index];

    const updatedProduct: ProductCarI = { ...oldProduct, ...newProductData };
    this.products.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nameFile);

    const index = await this.findIndex(id);
    this.products.splice(index, 1);
    await this.guardar();
  }

  async query(options: ProductCarQuery): Promise<ProductCarI[]> {
    await this.leer(this.nameFile);
    type Conditions = (aProduct: ProductCarI) => boolean;
    const query: Conditions[] = [];

    if (options.name)
      query.push((aProduct: ProductCarI) => aProduct.name == options.name);

    if (options.description)
      query.push((aProduct: ProductCarI) => aProduct.description == options.description);  
    
    if (options.codeproduct)
      query.push((aProduct: ProductCarI) => aProduct.codeproduct == options.codeproduct);

    if (options.url)
      query.push((aProduct: ProductCarI) => aProduct.url == options.url);

    if (options.price)
      query.push((aProduct: ProductCarI) => aProduct.price == options.price);
    
    if (options.stock)
      query.push((aProduct: ProductCarI) => aProduct.stock == options.stock);

    return this.products.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
