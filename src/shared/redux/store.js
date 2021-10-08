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

export default store;
