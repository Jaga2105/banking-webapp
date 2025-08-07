import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";
import loanApplicationReducer from "./reducers/loanApplicationsReducer";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    loanApplications: loanApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
