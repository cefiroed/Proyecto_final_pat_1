import moment from "moment";

const timeStamp = moment().format();

export interface newProductCarI {
  timestamp: string;
  productid: string;
}

export interface ProductCarI {
  _id: string;
  timestamp: string;
  productid: string;
}


export interface ProductCarBaseClass {
  get(id?: string | undefined): Promise<ProductCarI[]>;
  add(data: newProductCarI): Promise<ProductCarI>;
  delete(id: string): Promise<void>;
}
