/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import * as S from './PieChart.styled';
import { setPDFFileSrc } from '../../../../redux/store';

const PieChartApp = function PieChartApp() {
  const dispatch = useDispatch();
  const [start, setStart] = useState<boolean>(false);

  const data = [
    { name: 'Group A', value: 1 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = function renderCustomizedLabel(
    {
      cx, cy, midAngle, innerRadius, outerRadius, percent,
    }:
    { cx: any, cy: any, midAngle: any, innerRadius: any,
      outerRadius: any, percent: any, index: any },
  ) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    const node = document.getElementById('chart');
    if (node && start) {
      htmlToImage.toPng(node)
        .then((dataUrl) => {
          dispatch(setPDFFileSrc(dataUrl));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('oops, something went wrong!', error);
        });
    }
  }, [start]);

  return (
    <S.Container width={400} id="chart">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#25011a"
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onClick={() => {
                setStart(true);
                // console.log(entry.name);
              }}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <S.ChartDetails>
        width: 5000
        <div>
          Height: 4000
        </div>
        <div>
          Desc: this is the
          <div>
            description of everything that
          </div>
          <div>
            needs to be known
          </div>
        </div>
      </S.ChartDetails>
    </S.Container>
  );
};

export default PieChartApp;
