import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface ResultsState {
  isPopperOpen: boolean,
  isDestinationPopperOpen: boolean,
}

const initialState: ResultsState = {
  isPopperOpen: false,
  isDestinationPopperOpen: false,
};

export const counterSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setIsPopperOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopperOpen = action.payload;
    },
    setIsDestinationPopperOpen: (state, action: PayloadAction<boolean>) => {
      state.isDestinationPopperOpen = action.payload;
    },
  },
});

export const { setIsPopperOpen, setIsDestinationPopperOpen } = counterSlice.actions;

export const selectIsPopperOpen = (state: RootState) => state.setup.isPopperOpen;
export const selectIsDestinationPopperOpen = (state: RootState) => state.setup
  .isDestinationPopperOpen;

export default counterSlice.reducer;
