import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export const tripTypes = ['Round trip', 'One way', 'Multi-city'] as const;
export type Trip = typeof tripTypes[number]

export const flightClasses = ['Economy', 'Premium economy', 'Business', 'First'] as const;
export type FlightClass = typeof flightClasses[number]

const occupancyNames = ['Adults', 'Children', 'Infants'] as const;
const occupancyInfo = ['adult', 'Aged 2-11', 'In seat', 'On lap'] as const;
type OccupancyName = typeof occupancyNames[number];
type OccupancyInfo = typeof occupancyInfo[number];

export type OccupancyType = {
  name: OccupancyName,
  info: OccupancyInfo,
  count: number,
}

export const defaultOccupancies: OccupancyType[] = [{
  name: 'Adults',
  info: 'adult',
  count: 1,
}, {
  name: 'Children',
  info: 'Aged 2-11',
  count: 0,
}, {
  name: 'Infants',
  info: 'In seat',
  count: 0,
}, {
  name: 'Infants',
  info: 'On lap',
  count: 0,
}];

export type Location = {
  id: string,
  name: string,
  country: string,
  admin1: string,
  lat: string,
  lon: string,
  pop: string
}

export interface ViewsState {
  tripType: Trip,
  flightClass: FlightClass,
  occupancies: typeof defaultOccupancies,
  location: Location | null,
}

const initialState: ViewsState = {
  tripType: 'Round trip',
  flightClass: 'Economy',
  occupancies: defaultOccupancies,
  location: null,
};

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTripType: (state, action: PayloadAction<Trip>) => {
      state.tripType = action.payload;
    },
    setFlightClass: (state, action: PayloadAction<FlightClass>) => {
      state.flightClass = action.payload;
    },
    setOccupancies: (state, action: PayloadAction<typeof defaultOccupancies>) => {
      state.occupancies = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
  },
});

export const {
  setTripType, setFlightClass, setOccupancies, setLocation,
} = counterSlice.actions;

export const selectTripType = (state: RootState) => state.app.tripType;
export const selectFlightClass = (state: RootState) => state.app.flightClass;
export const selectOccupancies = (state: RootState) => state.app.occupancies;
export const selectLocation = (state: RootState) => state.app.location;

export default counterSlice.reducer;
