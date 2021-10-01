import type { Store } from 'redux';
import checkWindowAvailable from './utils';

const setStorage = (store: Store) => {
  const storeString = JSON.stringify(store.getState());
  return checkWindowAvailable() && window.sessionStorage.setItem('store', storeString);
};

const getState = () => {
  const storeString = checkWindowAvailable() && window.sessionStorage.getItem('store');
  return JSON.parse(<string>storeString) || {};
};

export const defineState = <T>(
  defaultState: T,
) => (reducer: string): T => {
    if (Object.prototype.hasOwnProperty.call(getState(), reducer)) {
      const localReducer = getState()[reducer];
      return localReducer || defaultState;
    }
    return defaultState;
  };

export const persistStore = (
  store: Store,
) => store.subscribe(() => setStorage(store));
