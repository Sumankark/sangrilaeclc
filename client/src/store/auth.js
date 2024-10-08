import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  isLoggedIn: false,
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateValue,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
