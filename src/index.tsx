import React, { PropsWithChildren, createContext, useContext, useLayoutEffect, useReducer, useRef } from "react";
import { Store, AnyAction, Action } from "redux";

const reduceNotify = (state: boolean) => !state;

/**
 * A hook to trigger a fresh render of the calling react component
 * @returns A function to call when you want to trigger a fresh rendering of the component.
 */
const useNotify = () => useReducer(reduceNotify, false)[1];
/** A hook to create a reference and always set it to the new value. Used to avoid a fresh render on change */
function useAndSetRef<T>(value: T) {
    const ref = useRef(value);
    ref.current = value;
    return ref;
};

const ReduxContext = createContext<Store | null>(null);
/** A provider receives a store and children */
export type ProviderProps = PropsWithChildren<{
    /** The store object to provide to all nested components */
    store: Store;
}>;

/**
 * The redux store provider
 * @param props store and children
 */
export const Provider = ({ store, children }: ProviderProps) => <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>;

/**
 * A hook to access the redux store
 * @throws When a `Provider` is missing.
 */
export function useStore<S = any, A extends Action = AnyAction>() {
    const store = useContext(ReduxContext);
    if (!store) {
        throw new Error("Could not find react redux context. Make sure you've added a Provider.");
    }
    return store as unknown as Store<S, A>;
}

/** Compare by reference */
export function compareRef<T>(a: T, b: T) { return a === b; }

/**
 * A hook to use a selector function to access redux state.
 * @param selector  The selector function to retrieve a value from the redux store. It receives the current redux state.
 * @param compare   The comparison function to use in order to only trigger a fresh render when something changed. Default compare by reference.
 * @throws When a `Provider` is missing.
 */
export function useSelector<S = any, A extends Action = AnyAction, R = any>(selector: (state: S) => R, compare: (a: R, b: R) => boolean = compareRef) {
    const notify = useNotify();
    const store = useStore<S, A>();
    const value = selector(store.getState());
    const lastCall = useAndSetRef({ selector, value });
    useLayoutEffect(() => {
        const listener = () => {
            const newValue = lastCall.current.selector(store.getState());
            if (!compare(newValue, lastCall.current.value))
                notify();
        };
        const unsubscribe = store.subscribe(listener);
        return () => unsubscribe();
    }, [store]);
    return value;
}

/**
 * A hook to get the redux stores dispatch function.
 * @throws When a `Provider` is missing.
 */
export function useDispatch<S = any, A extends Action = AnyAction>() {
    return useStore<S, A>().dispatch;
}
