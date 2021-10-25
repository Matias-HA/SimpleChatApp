// Libraries
import {configureStore} from '@reduxjs/toolkit';

// Includes
import authReducer from './auth/reducer';

/**
 * @Description This file contains the redux store configuration
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
