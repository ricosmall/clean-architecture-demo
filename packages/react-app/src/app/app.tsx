import React from "react";
import MyAppBar from "../appbar/my-appbar";
import { CartBloc, dependenciesLocator } from "@frontend-clean-architecture/core";
import { createContext } from "../common/context";
import ProductList from "../products/product-list";
import CartDrawer from "../cart/cart-drawer";

const [blocContext, useBloc] = createContext<CartBloc>();

export const useCartBloc = useBloc;

const App: React.FC = () => {
    return (
        <blocContext.Provider value={dependenciesLocator.provideCartBloc()}>
            <MyAppBar />
            <ProductList />
            <CartDrawer />
        </blocContext.Provider>
    );
};

export default App;
