import { Bloc } from "@frontend-clean-architecture/core";
import { useEffect, useState } from "react";

export function useBlocState<S>(bloc: Bloc<S>) {
    const [state, setState] = useState(bloc.state);

    useEffect(() => {
        const stateSubscription = (state: S) => {
            setState(state);
        };

        bloc.subscribe(stateSubscription);

        return () => bloc.unsubscribe(stateSubscription);
    }, [bloc]);

    return state;
}
