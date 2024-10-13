import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface LayoutState {
  fetchProgress: string,
}

const initialState: LayoutState = {
  fetchProgress: '25%',
};

export const counterSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setFetchProgress: (state, action: PayloadAction<string>) => {
      state.fetchProgress = action.payload;
    },
  },
});

export const { setFetchProgress } = counterSlice.actions;

export const selectFetchProgress = (state: RootState) => state.layout.fetchProgress;

export default counterSlice.reducer;
