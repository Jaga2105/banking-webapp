import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './reducers/menuReducer';

const store = configureStore({
  reducer:{
    menu:menuReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;