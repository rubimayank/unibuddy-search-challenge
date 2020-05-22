import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  it('it should render', () => {
    const snap = renderer.create(<PrimaryButton />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
