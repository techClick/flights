import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface ViewsState {
  isProductInterest: boolean
}

const initialState: ViewsState = {
  isProductInterest: false,
};

export const counterSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setIsProductInterest: (state, action) => {
      state.isProductInterest = action.payload;
    },
  },
});

export const { setIsProductInterest } = counterSlice.actions;

export const selectIsProductInterest = (state: RootState) => state.navigation.isProductInterest;

export default counterSlice.reducer;
