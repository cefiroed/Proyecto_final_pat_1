import { ProductsMemDAO } from './DAOs/memory';
import { ProductsFSDAO } from './DAOs/fs';

import path from 'path';
export enum TypePersistence {
  Memory = 'MEM',
  FileSystem = 'FS',
}

export class NewFactoryDAO {
  static get(type: TypePersistence) {
    switch (type) {
      case TypePersistence.FileSystem:
        console.log('RETURN INSTANCE CLASS FS');
        const filePath = path.resolve(__dirname, '../../../public/products.json');
        console.log(filePath);
        return new ProductsFSDAO(filePath);

      default:
        console.log('RETURN INSTANCE CLASS MEMORY');
        return new ProductsMemDAO();
    }
  }
}
