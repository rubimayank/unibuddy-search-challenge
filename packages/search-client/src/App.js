import React, { useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import BookSearch from './components/BookSearch';
import data from './data.json';

const GlobalStyles = createGlobalStyle`
  /* lazy reset */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #eee;
    min-height: 100vh;
    box-sizing: border-box;
  }
`;

const AppWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  padding: 8px;
`;

function App() {
  const books = useMemo(() => {
    // assuming that the data structure of the json will not change
    const { titles, summaries, authors } = data;
    return titles.map((title, id) => {
      const { author } = authors[id];
      const { summary } = summaries[id];
      return {
        id,
        title,
        author,
        // replacing following string from every summary
        summary: summary.replace(/^the book in three sentences\s*?(:)?/i, '').trim(),
      };
    });
  }, []);
  return (
    <AppWrapper>
      <BookSearch books={books} />
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;
