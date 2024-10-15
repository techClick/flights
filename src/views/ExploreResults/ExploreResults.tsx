import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setFetchProgress } from 'views/Layout/redux';
import SetUpFlight from 'views/components/SetUpFlight/SetUpFlight';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import {
  selectDeparture, selectDestination, selectCabinClass,
  selectLocation, selectOccupancies, selectReturnDate,
  selectTripType,
} from 'views/HomePage/redux';
import { toast } from 'react-toastify';
import { callEndpoint } from 'endPoint/endPoint';
import mockLocation from 'views/utils/location.json';
import mockDestination from 'views/utils/destination.json';
import mockFlight from 'views/utils/flight.json';
import * as S from './ExploreResults.styled';
import {
  AirPort, FlightType, FlightsInfo, defaultFlightsInfo, setFlightsInfo,
} from './redux';
import Flights from './Flights';

const ExploreResults = () => {
  const location = useAppSelector(selectLocation);
  const destination = useAppSelector(selectDestination);
  const departure = useAppSelector(selectDeparture);
  const returnDate = useAppSelector(selectReturnDate);
  const tripType = useAppSelector(selectTripType);
  const occupancies = useAppSelector(selectOccupancies);
  const cabinClass = useAppSelector(selectCabinClass);
  const [fetchTimeout, setFetchTimeout] = useState<any>(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const getFlightsRaw = (flightsSource: Record<string, any>): FlightType[] => {
    return flightsSource.map((details: Record<string, any>): FlightType => {
      return {
        airports: details.legs.map((leg: Record<string, any>): AirPort => {
          return {
            name: leg.carriers.marketing[0].name,
            img: leg.carriers.marketing[0].logoUrl,
            arrival: new Date(leg.arrival),
            depature: new Date(leg.departure),
            originInfo: { id: leg.origin.displayCode, name: leg.origin.name },
            destinationInfo: { id: leg.destination.displayCode, name: leg.origin.name },
          };
        }),
        price: details.price.formatted,
      };
    });
  };

  const fetchFlights = async (): Promise<'success' | 'Api limit' | 'others'> => {
    let locationInfoSource: Record<string, any> = {};
    let destinationInfoSource: Record<string, any> = {};
    let flightInfoSource: Record<string, any> = {};

    if (!location || !destination || !departure || (tripType === 'Round trip' && !returnDate)) {
      return 'others';
    }

    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
      locationInfoSource = mockLocation;
      destinationInfoSource = mockDestination;
    } else {
      const res = await callEndpoint({
        api: `/api/v1/flights/searchAirport?query=${location?.name}&locale=en-US`,
      });

      if (res.status !== 200 || !JSON.parse(res.data).status) {
        return 'Api limit';
      }
      const res1 = await callEndpoint({
        api: `/api/v1/flights/searchAirport?query=${destination?.name}&locale=en-US`,
      });

      if (res1.status !== 200 || !JSON.parse(res1.data).status) {
        return 'Api limit';
      }

      locationInfoSource = JSON.parse(res.data);
      destinationInfoSource = JSON.parse(res1.data);
    }

    const locationInfo0 = locationInfoSource.data?.find((
      entry: Record<string, Record<string, string>>,
    ) => entry.navigation.entityType === 'CITY');
    const locationInfo = (locationInfo0 || (JSON.parse(localStorage.getItem('Loc') || '{}')
      .data?.[0]))?.navigation?.relevantFlightParams;
    const destinationInfo0 = destinationInfoSource.data?.find((
      entry: Record<string, Record<string, string>>,
    ) => entry.navigation.entityType === 'CITY');
    const destinationInfo = (destinationInfo0 || (JSON.parse(localStorage.getItem('Des') || '{}')
      .data?.[0]))?.navigation?.relevantFlightParams;

    if (!locationInfo || !destinationInfo) {
      return 'others';
    }

    let offset = departure.getTimezoneOffset();
    const date = new Date(+departure - (offset * 60 * 1000)).toISOString().split('T')[0];

    offset = (returnDate || new Date()).getTimezoneOffset();
    const returnDateFormat = new Date(+(returnDate || new Date()) - (offset * 60 * 1000))
      .toISOString().split('T')[0];

    const api = `/api/v2/flights/searchFlights?originSkyId=${locationInfo.skyId}&date=${date}&${tripType === 'Round trip'
      && `returnDate=${returnDateFormat}&`}destinationSkyId=${destinationInfo
      .skyId}&originEntityId=${locationInfo.entityId}&destinationEntityId=${destinationInfo
      .entityId}&cabinClass=${cabinClass.split(' ').join('_').toLowerCase()}&adults=${occupancies.find((occ) => occ
      .name === 'Adults')?.count || 1}&children=${occupancies.find((occ) => occ
      .name === 'Children')?.count || 0}&infants=${occupancies.reduce((a, b) => a + (b.name === 'Infants' ? b
      .count : 0), 0)}&sortBy=best&currency=USD`;

    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
      flightInfoSource = mockFlight;
    } else {
      const res2 = await callEndpoint({ api });

      if (res2.status !== 200 || !JSON.parse(res2.data).status) {
        return 'Api limit';
      }

      flightInfoSource = JSON.parse(res2.data);
    }

    // console.log(flightInfoSource);

    const flightsInfo: FlightsInfo = {
      isMock: false,
      flights: getFlightsRaw(flightInfoSource.data.itineraries),
    };

    // eslint-disable-next-line no-console
    console.log(flightsInfo);

    dispatch(setFlightsInfo(flightsInfo));

    return 'success';
  };

  useEffect(() => {
    dispatch(setFetchProgress('fetching'));
    dispatch(setFlightsInfo(defaultFlightsInfo));

    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
      setFetchTimeout(null);
    }

    setFetchTimeout(setTimeout(async () => {
      const result = await fetchFlights();
      dispatch(setFetchProgress('fetched'));

      if (result === 'Api limit') {
        toast('Air scraper 500/month API usage limit reached, showing mock results.', { type: 'warning' });

        const flightsInfo: FlightsInfo = {
          isMock: true,
          flights: getFlightsRaw(mockFlight),
        };

        dispatch(setFlightsInfo(flightsInfo));
      }
    }, 800));
  }, [location, destination, departure, returnDate, tripType, occupancies, cabinClass]);

  if (!location || !destination || !departure || (tripType === 'Round trip' && !returnDate)) {
    history.push('/');
    return null;
  }

  return (
    <S.Container>
      <SetUpFlight />
      <S.FlightsCont>
        <Flights />
      </S.FlightsCont>
    </S.Container>
  );
};

export default ExploreResults;
