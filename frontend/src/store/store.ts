import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";
import loanApplicationReducer from "./reducers/loanApplicationsReducer";
import cardReducer from "./reducers/cardReducer";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    loanApplications: loanApplicationReducer,
    card: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
