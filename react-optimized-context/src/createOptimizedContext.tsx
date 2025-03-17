import React, {
    useRef,
    createContext,
    useContext,
    useCallback,
    useSyncExternalStore,
} from "react";

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type Action = { type: string; payload?: unknown };

type OptimizedContextOption<T> = {
    reducer?: (state: T, action: Action) => void;
    persistKey?: string;
};

export default function createOptimizedContext<OptimizedContext>(
    initialState: OptimizedContext,
    { reducer, persistKey }: OptimizedContextOption<OptimizedContext>
) {
    function loadState(): OptimizedContext {
        if (!persistKey) return initialState;
        try {
            const stored = localStorage.getItem(persistKey);
            return stored ? JSON.parse(stored) : initialState;
        } catch {
            return initialState;
        }
    }

    function saveState(state: OptimizedContext) {
        if (!persistKey) return;
        try {
            localStorage.setItem(persistKey, JSON.stringify(state));
        } catch {
            console.warn("Failed to save state.");
        }
    }

    function useOptimizedContextData() {
        const store = useRef(loadState());
        const subscribers = useRef(new Set<() => void>());

        const get = useCallback(() => store.current, []);

        const set = useCallback(
            (
                update:
                    | DeepPartial<OptimizedContext>
                    | ((state: OptimizedContext) => void)
                    | Action
            ) => {
                const nextState = structuredClone(store.current);

                if (typeof update === "function") {
                    update(nextState);
                } else if ("type" in update && reducer) {
                    reducer(nextState, update);
                } else {
                    const partialUpdate =
                        update as DeepPartial<OptimizedContext>;
                    Object.keys(partialUpdate).forEach((key) => {
                        const typedKey = key as keyof OptimizedContext;
                        const currentValue = nextState[typedKey];
                        const newValue = partialUpdate[typedKey];

                        if (
                            typeof newValue === "object" &&
                            newValue !== null &&
                            typeof currentValue === "object" &&
                            currentValue !== null
                        ) {
                            nextState[typedKey] = {
                                ...currentValue,
                                ...newValue,
                            } as OptimizedContext[keyof OptimizedContext];
                        } else if (newValue !== undefined) {
                            nextState[typedKey] =
                                newValue as OptimizedContext[keyof OptimizedContext];
                        }
                    });
                }

                store.current = nextState;
                saveState(nextState); // 🔹 Persist state only if `persistKey` exists
                subscribers.current.forEach((callback) => callback());
            },
            []
        );

        const subscribe = useCallback((callback: () => void) => {
            subscribers.current.add(callback);
            return () => subscribers.current.delete(callback);
        }, []);

        return { get, set, subscribe };
    }

    type ContextData = ReturnType<typeof useOptimizedContextData>;
    const OptimizedContext = createContext<ContextData | null>(null);

    function OptimizedContextProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <OptimizedContext.Provider value={useOptimizedContextData()}>
                {children}
            </OptimizedContext.Provider>
        );
    }

    function useOptimizedContext<SelectorOutput>(
        selector: (store: OptimizedContext) => SelectorOutput
    ): SelectorOutput {
        const optimizedContext = useContext(OptimizedContext);
        if (!optimizedContext) throw new Error("Store not found");

        return useSyncExternalStore(
            optimizedContext.subscribe,
            () => selector(optimizedContext.get()),
            () => selector(initialState)
        );
    }

    function useOptimizedDispatch() {
        const optimizedContext = useContext(OptimizedContext);
        if (!optimizedContext) throw new Error("Store not found");

        return optimizedContext.set;
    }

    return {
        OptimizedContextProvider,
        useOptimizedContext,
        useOptimizedDispatch,
    };
}
