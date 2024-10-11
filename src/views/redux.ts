import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export interface ViewsState {
}

const initialState: ViewsState = {
};

export const counterSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    setIsProductInterest: (state, action) => {
      // state.isProductInterest = action.payload;
    },
  },
});

export const { setIsProductInterest } = counterSlice.actions;

// export const selectIsProductInterest = (state: RootState) => state.views.isProductInterest;

export default counterSlice.reducer;
