import React, { createContext, useReducer, type Dispatch, type ReactNode } from 'react';

/**
 * Generic helper that wires a reducer + a set of action creators into a
 * React context, mirroring the original app's `createDataContext` pattern.
 *
 * Each entry in `actions` is a function `(dispatch) => (...args) => ...` -
 * `createDataContext` binds `dispatch` once so consumers just call the
 * bound version straight from `useContext`.
 */
export default function createDataContext<
  State,
  Action,
  Actions extends Record<string, (dispatch: Dispatch<Action>) => (...args: any[]) => any>,
>(reducer: React.Reducer<State, Action>, actions: Actions, defaultValue: State) {
  type BoundActions = { [K in keyof Actions]: ReturnType<Actions[K]> };
  type ContextValue = { state: State } & BoundActions;

  const Context = createContext<ContextValue>(undefined as unknown as ContextValue);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {} as BoundActions;
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch) as BoundActions[typeof key];
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
}
