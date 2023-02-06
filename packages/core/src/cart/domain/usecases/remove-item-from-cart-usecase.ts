import { CartRepository } from "../repositories/cart-repository";
import { Cart } from "../entities/cart";

export class RemoveItemFromCartUseCase {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute(itemId: string): Promise<Cart> {
        const cart = await this.cartRepository.get();

        const editedCart = cart.removeItem(itemId);

        await this.cartRepository.save(editedCart);

        return editedCart;
    }
}
