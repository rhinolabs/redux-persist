import type { Store } from 'redux';
import checkWindowAvailable from './utils';

const setStorage = (store: Store) => {
  const storeString = JSON.stringify(store.getState());
  return checkWindowAvailable() && window.sessionStorage.setItem('store', storeString);
};

const hasSameProps = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) => Object.keys(obj1).every((prop) => Object.prototype.hasOwnProperty.call(obj2, prop));

const getState = () => {
  const storeString = checkWindowAvailable() && window.sessionStorage.getItem('store');
  return JSON.parse(<string>storeString) || {};
};

export const defineState = <T>(
  defaultState: T,
) => (reducer: string): T => {
    if (Object.prototype.hasOwnProperty.call(getState(), reducer)) {
      const localReducer = getState()[reducer];
      return hasSameProps(defaultState, localReducer) ? localReducer : defaultState;
    }
    return defaultState;
  };

export const persistStore = (
  store: Store,
) => store.subscribe(() => setStorage(store));
