import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type AirPort = {
  name: string,
  img: string,
  arrival: Date,
  depature: Date,
  originInfo: {
    id: string,
    name: string,
  }
  destinationInfo: {
    id: string,
    name: string,
  }
}

export type FlightType = {
  airports: AirPort[],
  price: string,
}

export type FlightsInfo = {
  isMock: boolean,
  flights: FlightType[] | null,
}

export interface ResultsState {
  flightsInfo: FlightsInfo,
  isPopperOpen: boolean,
}

export const defaultFlightsInfo = {
  isMock: false,
  flights: null,
};

const initialState: ResultsState = {
  flightsInfo: defaultFlightsInfo,
  isPopperOpen: false,
};

export const counterSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setFlightsInfo: (state, action: PayloadAction<FlightsInfo>) => {
      state.flightsInfo = action.payload;
    },
    setIsPopperOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopperOpen = action.payload;
    },
  },
});

export const { setFlightsInfo, setIsPopperOpen } = counterSlice.actions;

export const selectFlightsInfo = (state: RootState) => state.results.flightsInfo;
export const selectIsPopperOpen = (state: RootState) => state.results.isPopperOpen;

export default counterSlice.reducer;
