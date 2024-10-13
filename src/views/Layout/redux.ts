import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface LayoutState {
  fetchProgress: 'fetching' | 'fetched',
}

const initialState: LayoutState = {
  fetchProgress: 'fetched',
};

export const counterSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setFetchProgress: (state, action: PayloadAction<'fetching' | 'fetched'>) => {
      state.fetchProgress = action.payload;
    },
  },
});

export const { setFetchProgress } = counterSlice.actions;

export const selectFetchProgress = (state: RootState) => state.layout.fetchProgress;

export default counterSlice.reducer;
