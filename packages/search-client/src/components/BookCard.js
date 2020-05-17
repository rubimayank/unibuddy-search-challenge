import React from 'react';
import styled from 'styled-components';
import {
  MdClose
} from 'react-icons/md';

import Card from './Card';
import Button from './BaseButton';

const Title = styled.h3`
  font-size: 18px;
  padding-right: 40px;
`;

const Author = styled.span`
  font-size: 14px;
  color: #888;
`;

const Summary = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Remove = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px;
`;

function BookCard({ book, onRemove }) {
  const { author, title, summary } = book;
  const shortSummary = summary.substring(0, 160);
  return (
    <Card>
      <div>
        <Title>{title}</Title>
        <Author>{author}</Author>
      </div>
      <Summary>
        {shortSummary}
        {summary.length > 200 && '...'}
      </Summary>
      {onRemove && (
        <Remove onClick={onRemove} title='Remove'>
          <MdClose />
        </Remove>
      )}
    </Card>
  );
}

export default BookCard;
