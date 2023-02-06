import { Cart } from "../entities/cart";

export interface CartRepository {
    get(): Promise<Cart>;
    save(cart: Cart): Promise<boolean>;
}
