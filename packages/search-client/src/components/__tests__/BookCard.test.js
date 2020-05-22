import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import BookCard from '../BookCard';

const book = {
    title: 'title',
    author: 'author',
    summary: 'summary',
};

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar quam id augue porta vestibulum in vel justo. Cras maximus volutpat magna et sagittis. Sed lacinia, tortor vel maximus ullamcorper, leo felis posuere nisi, sed viverra sem erat non orci. Etiam semper dui ac venenatis malesuada. Donec vitae turpis rhoncus, egestas nisi id, porta quam.';

describe('BookCard', () => {
  it('it should render', () => {
    const snap = renderer.create(<BookCard book={book} />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('it should render long summary with elipses', () => {
    const longSummaryBook = {
      ...book,
      summary: lorem,
    };
    const snap = renderer.create(<BookCard book={book} />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('it should render with remove button', () => {
    const snap = renderer
      .create(<BookCard book={book} onRemove={() => {}} />)
      .toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should call onRemove', () => {
    let removed = false;
    const wrapper = renderer
      .create(<BookCard book={book} onRemove={()=>{ removed = true; }} />)
      .root;
    const removeBtn = wrapper.findByType('button');
    removeBtn.props.onClick();
    expect(removed).toEqual(true);
  });
});
