import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard, faFileWaveform, faDatabase, faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export const tabOptions = [
  {
    label: 'Analytics',
    route: '/analytics',
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  {
    label: 'Income',
    route: '/income',
    icon: <FontAwesomeIcon icon={faCreditCard} />,
  },
  {
    label: 'Resources',
    route: '/resources',
    icon: <FontAwesomeIcon icon={faDatabase} />,
  },
  {
    label: 'Reports',
    route: '/reports',
    icon: <FontAwesomeIcon icon={faFileWaveform} />,
  },
];
