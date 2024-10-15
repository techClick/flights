import React from 'react';
import { convertTime } from 'views/utils/utils';
import { useAppSelector } from 'redux/hooks';
import { selectTripType } from 'views/HomePage/redux';
import * as S from './Flights.styled';
import { selectFlightsInfo } from './redux';

const Flights = () => {
  const flightsInfo = useAppSelector(selectFlightsInfo);
  const tripType = useAppSelector(selectTripType);

  return (
    <S.Container>
      {
        [...(flightsInfo.flights || [])]?.sort((a, b) => +a.price.replace(/\$|,/g, '') - +b.price.replace(/\$|,/g, ''))
          .map((flight) => {
            const { airports, price } = flight;
            const duration = +airports[airports.length - 1].arrival - +airports[0].depature;
            // console.log(duration / (60 * 60 * 1000), Math.floor(duration / (60 * 60 * 1000)));
            const durationText = `${Math.trunc(duration / (60 * 60 * 1000))} hr
              ${Math.round(+(`0.${(duration / (60 * 60 * 1000)).toString().split('.')[1] || 0}`) * 60)} min`;
            const stops = airports.length - (tripType === 'One way' ? 1 : 2);

            return (
              <S.Flight>
                <S.Cell>
                  <S.Image src={airports[0].img} />
                </S.Cell>
                <S.TimeCell>
                  <S.Time>
                    {`${convertTime(airports[0].depature)} - ${convertTime(airports[airports.length - 1].arrival)}`}
                  </S.Time>
                  <S.AirportName>{ airports[0].name }</S.AirportName>
                </S.TimeCell>
                <S.DurationCell>
                  <S.Duration>{durationText}</S.Duration>
                  <S.AirportName>
                    {
                      tripType === 'Round trip' ? airports[0].originInfo.name
                        : `${airports[0].originInfo.id} - ${airports[airports.length - 1].destinationInfo.id}`
                    }
                  </S.AirportName>
                </S.DurationCell>
                <S.StopsCell>
                  <S.Duration>
                    {!stops ? 'Nonstop' : `${stops} stop${stops === 1 ? '' : 's'}`}
                  </S.Duration>
                </S.StopsCell>
                <S.PriceCell>
                  <S.Time>{`USD ${price.replace('$', '')}`}</S.Time>
                  <S.AirportName>{ tripType.toLowerCase() }</S.AirportName>
                </S.PriceCell>
              </S.Flight>
            );
          })
      }
    </S.Container>
  );
};

export default Flights;
