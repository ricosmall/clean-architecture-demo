import { CartRepository } from '../repositories/cart-repository';
import { Cart } from '../entities/cart';

export class GetCartUseCase {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  execute(): Promise<Cart> {
    return this.cartRepository.get();
  }
}
