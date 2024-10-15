import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export const tripTypes = ['Round trip', 'One way'] as const;
export type Trip = typeof tripTypes[number]

export const cabinClasses = ['Economy', 'Premium economy', 'Business', 'First'] as const;
export type CabinClass = typeof cabinClasses[number]

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

export type LocationType = {
  id: string,
  name: string,
  country: string,
  admin1: string,
  lat: string,
  lon: string,
  pop: string
}

export interface AppState {
  tripType: Trip,
  cabinClass: CabinClass,
  occupancies: typeof defaultOccupancies,
  location: LocationType | null,
  destination: LocationType | null,
  departure: Date | null,
  returnDate: Date | null,
}

const initialState: AppState = {
  tripType: 'Round trip',
  cabinClass: 'Economy',
  occupancies: defaultOccupancies,
  location: null,
  destination: null,
  departure: null,
  returnDate: null,
};

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTripType: (state, action: PayloadAction<Trip>) => {
      state.tripType = action.payload;
    },
    setCabinClass: (state, action: PayloadAction<CabinClass>) => {
      state.cabinClass = action.payload;
    },
    setOccupancies: (state, action: PayloadAction<typeof defaultOccupancies>) => {
      state.occupancies = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationType | null>) => {
      state.location = action.payload;
    },
    setDestination: (state, action: PayloadAction<LocationType | null>) => {
      state.destination = action.payload;
    },
    setDepature: (state, action: PayloadAction<Date | null>) => {
      state.departure = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<Date | null>) => {
      state.returnDate = action.payload;
    },
  },
});

export const {
  setTripType, setCabinClass, setOccupancies, setLocation, setDestination, setDepature,
  setReturnDate,
} = counterSlice.actions;

export const selectTripType = (state: RootState) => state.app.tripType;
export const selectCabinClass = (state: RootState) => state.app.cabinClass;
export const selectOccupancies = (state: RootState) => state.app.occupancies;
export const selectLocation = (state: RootState) => state.app.location;
export const selectDestination = (state: RootState) => state.app.destination;
export const selectDeparture = (state: RootState) => state.app.departure;
export const selectReturnDate = (state: RootState) => state.app.returnDate;

export default counterSlice.reducer;
