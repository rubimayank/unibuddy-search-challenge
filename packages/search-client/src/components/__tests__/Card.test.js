import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Card from '../Card';

describe('Card', () => {
  it('it should render', () => {
    const snap = renderer.create(<Card />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
