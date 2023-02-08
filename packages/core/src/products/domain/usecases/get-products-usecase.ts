import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../entities/product';

export class GetProductsUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  execute(filter: string): Promise<Product[]> {
    return this.productRepository.get(filter);
  }
}
