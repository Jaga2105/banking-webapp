import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface stateTypes {
  isChangeDetected: boolean;
}
const initialState: stateTypes = {
  isChangeDetected: false,
};
const cardReducer = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateAnyChangeDetected(state, action: PayloadAction<boolean>) {
      state.isChangeDetected = action.payload;
    },
  },
});
export const { updateAnyChangeDetected } = cardReducer.actions;
export default cardReducer.reducer;
