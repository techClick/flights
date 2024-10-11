/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Routing from './routing';

test('app starts', () => {
  render(<Routing />);
});
