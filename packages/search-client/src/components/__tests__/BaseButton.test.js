import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import BaseButton from '../BaseButton';

describe('BaseButton', () => {
  it('it should render', () => {
    const snap = renderer.create(<BaseButton />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
