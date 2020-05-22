import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Input from '../Input';

describe('input', () => {
  it('it should render', () => {
    const snap = renderer.create(<Input />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should render with icon', () => {
    const snap = renderer.create(<Input icon={<i>i</i>}/>).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should render with clear button', () => {
    const snap = renderer.create(<Input onClear={()=>{}}/>).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should call onClear', () => {
    let foo = 'bar';
    const wrapper = renderer.create(<Input onClear={()=>{ foo=''; }} />).root;
    const clearBtn = wrapper.findByType('button');
    clearBtn.props.onClick();
    expect(foo).toEqual('');
  });
});
