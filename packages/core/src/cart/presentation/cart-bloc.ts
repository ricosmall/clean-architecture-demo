import { CartState, cartInitialState, CartItemState } from "./cart-state";
import { Bloc } from "../../common/presentation/bloc";
import { GetCartUseCase } from "../domain/usecases/get-cart-usecase";
import { AddProductToCartUseCase } from "../domain/usecases/add-product-to-card-usecase";
import { RemoveItemFromCartUseCase } from "../domain/usecases/remove-item-from-cart-usecase";
import { EditQuantityOfCartItemUseCase } from "../domain/usecases/edit-quantity-of-cart-item-usecase";
import { Product } from "../../products/domain/entities/product";
import { Cart } from "../domain/entities/cart";

export class CartBloc extends Bloc<CartState> {
    constructor(
        private getCartUseCase: GetCartUseCase,
        private addProductToCartUseCase: AddProductToCartUseCase,
        private removeItemFromCartUseCase: RemoveItemFromCartUseCase,
        private editQuantityOfCartItemUseCase: EditQuantityOfCartItemUseCase
    ) {
        super(cartInitialState);

        this.loadCart();
    }

    closeCart() {
        this.changeState({ ...this.state, open: false });
    }

    openCart() {
        this.changeState({ ...this.state, open: true });
    }

    async removeCartItem(item: CartItemState) {
        const cart = await this.removeItemFromCartUseCase.execute(item.id);
        this.changeState(this.mapToUpdatedState(cart));
    }

    async editQuantityCartItem(item: CartItemState, quantity: number) {
        const cart = await this.editQuantityOfCartItemUseCase.execute(item.id, quantity);

        this.changeState(this.mapToUpdatedState(cart));
    }

    async addProductToCart(product: Product) {
        const cart = await this.addProductToCartUseCase.execute(product);
        this.changeState(this.mapToUpdatedState(cart));
    }

    private async loadCart() {
        const result = await this.getCartUseCase.execute();
        this.changeState(this.mapToUpdatedState(result));
    }

    mapToUpdatedState(cart: Cart): CartState {
        const formatOptions = { style: "currency", currency: "EUR" };

        return {
            kind: "UpdatedCartState",
            open: this.state.open,
            totalItems: cart.totalItems,
            totalPrice: cart.totalPrice.toLocaleString("es-ES", formatOptions),
            items: cart.items.map(cartItem => {
                return {
                    id: cartItem.id,
                    image: cartItem.image,
                    title: cartItem.title,
                    price: cartItem.price.toLocaleString("es-ES", formatOptions),
                    quantity: cartItem.quantity,
                };
            }),
        };
    }
}
