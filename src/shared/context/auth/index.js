import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    errorMessage: 'test',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = '';
    },
  },
});

export const {setUser, setErrorMessage} = authSlice.actions;
export default authSlice.reducer;
