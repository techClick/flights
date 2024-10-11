import { createSlice } from '@reduxjs/toolkit';
import { callEndpoint } from '../endPoint/endPoint';
import { RootState } from '../redux/store';
import { IResponse } from '../types/types';

export interface ViewsState {
  isProductInterest: boolean
}

const initialState: ViewsState = {
  isProductInterest: false,
};

export const counterSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    setIsProductInterest: (state, action) => {
      state.isProductInterest = action.payload;
    },
  },
});

export const { setIsProductInterest } = counterSlice.actions;

export const selectIsProductInterest = (state: RootState) => state.views.isProductInterest;

export default counterSlice.reducer;

export const payBulk = () => async (dispatch: Function): Promise<IResponse> => {
  const response: IResponse = await dispatch(
    callEndpoint({ prefix: 1, api: 'V1.0/pay.php' }),
  );
  // console.log('FINAL', response);
  return response;
};
