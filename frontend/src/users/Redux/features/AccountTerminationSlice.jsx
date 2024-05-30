import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountTerminationRequest: false,
  terminatingUser: null,
};

const AccountTerminationSlice = createSlice({
  name: "accountTermination",

  initialState,

  reducers: {
    authenticateTerminatingUser(state, action) {
      state.accountTerminationRequest = true;

      state.terminatingUser = action.payload;
    },
    clearTerminatingUser(state) {
      state.accountTerminationRequest = false;

      state.terminatingUser = null;
    },
  },
});

export const { authenticateTerminatingUser, clearTerminatingUser } =
  AccountTerminationSlice.actions;

export default AccountTerminationSlice;
