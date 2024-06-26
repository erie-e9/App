import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import { api } from '@hooks/api';
import { reducers } from '@store/reducers';
// import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
// import { setupDefaultFlipperReporter } from 'react-native-performance-flipper-reporter';

const { APP_NAME } = process.env;
const storage = new MMKV({
  id: `${APP_NAME}-storage`,
  encryptionKey: `${APP_NAME}`,
});

if (__DEV__) {
  // initializeMMKVFlipper({ default: storage });
  // setupDefaultFlipperReporter();
}

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['appPreferences', 'auth', 'languages', 'remoteConfigFeatures'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(api.middleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // const createDebugger = require('redux-flipper').default;
      middlewares.push();
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
