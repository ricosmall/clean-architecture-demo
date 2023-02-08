import { Product } from '../entities/product';

export interface ProductRepository {
  get(filter: string): Promise<Product[]>;
}
