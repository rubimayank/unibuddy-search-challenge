import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
`;

function App() {
  return (
    <AppWrapper>
      <h1>Search Demo</h1>
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;
