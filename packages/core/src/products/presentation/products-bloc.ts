import { Bloc } from "../../common/presentation/bloc";
import { GetProductsUseCase } from "../domain/usecases/get-products-usecase";
import { productsInitialState, ProductsState } from "./products-state";

export class ProductsBloc extends Bloc<ProductsState> {
    constructor(private getProductsUseCase: GetProductsUseCase) {
        super(productsInitialState);
    }

    async search(searchTerm: string) {
        const products = await this.getProductsUseCase.execute(searchTerm);

        this.changeState({
            kind: "LoadedProductsState",
            products,
            searchTerm,
        });
    }
}
