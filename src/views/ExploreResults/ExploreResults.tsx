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

  const fetchFlights = async (): Promise<'success' | 'Api limit' | 'devEnv' | 'no dates' | 'others'
  | 'no location' | 'no destination'> => {
    if (!location || !destination || !departure || (tripType === 'Round trip' && !returnDate)) {
      return 'others';
    }

    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
      return 'devEnv';
    }

    const res = await callEndpoint({
      api: `/api/v1/flights/searchAirport?query=${encodeURIComponent(location?.name)}&locale=en-US`,
    });

    if (res.status !== 200 || !JSON.parse(res.data).status) {
      return 'Api limit';
    }
    const res1 = await callEndpoint({
      api: `/api/v1/flights/searchAirport?query=${encodeURIComponent(destination?.name)}&locale=en-US`,
    });

    if (res1.status !== 200 || !JSON.parse(res1.data).status) {
      return 'Api limit';
    }

    const locationInfoSource = JSON.parse(res.data);
    const destinationInfoSource = JSON.parse(res1.data);

    const locationInfo0 = locationInfoSource.data?.find((
      entry: Record<string, Record<string, string>>,
    ) => entry.navigation.entityType === 'CITY');
    const locationInfo = (locationInfo0 || (locationInfoSource
      .data?.[0]))?.navigation?.relevantFlightParams;
    const destinationInfo0 = destinationInfoSource.data?.find((
      entry: Record<string, Record<string, string>>,
    ) => entry.navigation.entityType === 'CITY');
    const destinationInfo = (destinationInfo0 || (destinationInfoSource
      .data?.[0]))?.navigation?.relevantFlightParams;

    // console.log(locationInfo, destinationInfo, res.data, res1.data, location, destination);
    if (!locationInfo) {
      return 'no location';
    }

    if (!destinationInfo) {
      return 'no destination';
    }

    let offset = departure.getTimezoneOffset();
    const date = new Date(+departure - (offset * 60 * 1000)).toISOString().split('T')[0];

    offset = (returnDate || new Date()).getTimezoneOffset();
    const returnDateFormat = new Date(+(returnDate || new Date()) - (offset * 60 * 1000))
      .toISOString().split('T')[0];

    const api = `/api/v1/flights/searchFlights?originSkyId=${locationInfo.skyId}&date=${date}&${tripType === 'Round trip'
      && `returnDate=${returnDateFormat}&`}destinationSkyId=${destinationInfo
      .skyId}&originEntityId=${locationInfo.entityId}&destinationEntityId=${destinationInfo
      .entityId}&cabinClass=${cabinClass.split(' ').join('_').toLowerCase()}&adults=${occupancies.find((occ) => occ
      .name === 'Adults')?.count || 1}&children=${occupancies.find((occ) => occ
      .name === 'Children')?.count || 0}&infants=${occupancies.reduce((a, b) => a + (b.name === 'Infants' ? b
      .count : 0), 0)}&sortBy=best&currency=USD`;

    const res2 = await callEndpoint({ api });

    if (res2.status !== 200 || !JSON.parse(res2.data).status) {
      return 'Api limit';
    }

    if (!JSON.parse(res2.data).data?.itineraries?.length) {
      return 'no dates';
    }

    const flightsInfo: FlightsInfo = {
      isMock: false,
      flights: getFlightsRaw(JSON.parse(res2.data).data.itineraries),
    };

    // console.log(flightsInfo);

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

      if (result === 'Api limit' || result === 'devEnv') {
        if (result === 'Api limit') {
          toast(
            'Air scraper API error. 500/month API usage limit may have reached, showing mock results.',
            { type: 'warning' },
          );
        }

        const flightsInfo: FlightsInfo = {
          isMock: true,
          flights: getFlightsRaw(mockFlight.data.itineraries),
        };

        dispatch(setFlightsInfo(flightsInfo));
      } else if (result === 'no dates') {
        toast('No data found for the date period. Please try different dates', { type: 'warning', autoClose: 10000 });
      } else if (result === 'no location') {
        toast(
          'No data found for the origin. Please try a different location of origin',
          { type: 'warning', autoClose: 10000 },
        );
      } else if (result === 'no destination') {
        toast(
          'No data found for the destination. Please try different destination',
          { type: 'warning', autoClose: 10000 },
        );
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
