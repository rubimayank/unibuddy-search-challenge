import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  padding: 12px;
  box-shadow: rgba(0,0,0,0.12) 1px 1px 1px 2px;
  border-radius: 6px;
  > div {
    padding-bottom: 12px;
    &:last-child {
      padding-bottom: 0;
    }
  }
  margin: 8px;
`;

export default Card;
