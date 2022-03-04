import { ProductsCarMemDAO } from './DAOs/memory';
import { ProductsCarFSDAO } from './DAOs/fs';

import path from 'path';
export enum TypePersistence {
  Memory = 'MEM',
  FileSystem = 'FS'
}

export class NewFactoryCarDAO {
  static get(type: TypePersistence) {
    switch (type) {
      case TypePersistence.FileSystem:
        console.log('RETURN INSTANCE CLASS FS');
        const filePath = path.resolve(__dirname, '../../../public/productscar.json');
        console.log(filePath);
        return new ProductsCarFSDAO(filePath); 

      default:
        console.log('RETURN INSTANCE CLASS MEMORY');
        return new ProductsCarMemDAO();
    }
  }
}
