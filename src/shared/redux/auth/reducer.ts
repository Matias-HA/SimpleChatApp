// Libraries
import {createSlice, dispatch, PayloadAction} from '@reduxjs/toolkit';

// Includes
import {UserInfo} from '../../types';

/**
 * This file contains the auth related reducers as well as the initial auth state
 */

// Define type for the auth state
interface AuthState {
  user: UserInfo | null;
  errorMessage: string;
}

// Define the initial state for this type
const initialState: AuthState = {
  user: null,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    signOutUser: (state, action) => {
      state.user = null;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = '';
    },
  },
});

const {reducer, actions} = authSlice;

export const {setUser, signOutUser, setErrorMessage, clearErrorMessage} =
  actions;

export default reducer;
