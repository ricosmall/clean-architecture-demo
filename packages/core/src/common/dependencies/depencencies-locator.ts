import { CartInMemoryRepository } from "../../cart/data/cart-in-memory-repository";
import { AddProductToCartUseCase } from "../../cart/domain/usecases/add-product-to-card-usecase";
import { EditQuantityOfCartItemUseCase } from "../../cart/domain/usecases/edit-quantity-of-cart-item-usecase";
import { GetCartUseCase } from "../../cart/domain/usecases/get-cart-usecase";
import { RemoveItemFromCartUseCase } from "../../cart/domain/usecases/remove-item-from-cart-usecase";
import { CartBloc } from "../../cart/presentation/cart-bloc";
import { ProductInMemoryRepository } from "../../products/data/product-in-memory-repository";
import { GetProductsUseCase } from "../../products/domain/usecases/get-products-usecase";
import { ProductsBloc } from "../../products/presentation/products-bloc";

function provideProductsBloc(): ProductsBloc {
    const productRepository = new ProductInMemoryRepository();
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const productsBloc = new ProductsBloc(getProductsUseCase);

    return productsBloc;
}

function provideCartBloc(): CartBloc {
    const cartRepository = new CartInMemoryRepository();
    const getCartUseCase = new GetCartUseCase(cartRepository);
    const addProductToCartUseCase = new AddProductToCartUseCase(cartRepository);
    const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(cartRepository);
    const editQuantityOfCartItemUseCase = new EditQuantityOfCartItemUseCase(cartRepository);
    const cartBloc = new CartBloc(
        getCartUseCase,
        addProductToCartUseCase,
        removeItemFromCartUseCase,
        editQuantityOfCartItemUseCase
    );

    return cartBloc;
}

export const dependenciesLocator = {
    provideProductsBloc,
    provideCartBloc,
};
