// Libraries
import {createSlice, dispatch} from '@reduxjs/toolkit';

/**
 * @Description This file contains the auth related reducers as well as the initial auth state
 */

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    additionalUserInfo: null,
    errorMessage: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOutUser: (state, action) => {
      state.user = null;
      state.additionalUserInfo = null;
    },
    setAdditionalUserInfo: (state, action) => {
      state.additionalUserInfo = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = '';
    },
  },
});

const {reducer, actions} = authSlice;

export const {
  setUser,
  setAdditionalUserInfo,
  signOutUser,
  setErrorMessage,
  clearErrorMessage,
} = actions;

export default reducer;
