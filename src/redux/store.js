import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './houseSlice';

export const store = configureStore({
  reducer: {
    house: houseReducer,
  },
});
