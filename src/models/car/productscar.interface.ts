export interface newProductCarI {
  name?: string;
  price?: number;
  description?: string;
  codeproduct?: number;
  url?: string;
  stock?: number;
}

export interface ProductCarI {
  _id: string;
  name: string;
  price: number;
  description?: string;
  codeproduct?: number;
  url?: string;
  stock?: number;
}

export interface ProductCarQuery {
  name?: string;
  price?: number;
  description?: string;
  codeproduct?: number;
  url?: string;
  stock?: number;

  

}

export interface ProductCarBaseClass {
  get(id?: string | undefined): Promise<ProductCarI[]>;
  add(data: newProductCarI): Promise<ProductCarI>;
  update(id: string, newProductData: newProductCarI): Promise<ProductCarI>;
  delete(id: string): Promise<void>;
  query(options: ProductCarQuery): Promise<ProductCarI[]>;
}
