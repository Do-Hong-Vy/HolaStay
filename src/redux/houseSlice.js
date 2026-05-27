import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  houses: [],
};

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setHouses: (state, action) => {
      state.houses = action.payload;
    },
  },
});

export const { setHouses } = houseSlice.actions;
export default houseSlice.reducer;
