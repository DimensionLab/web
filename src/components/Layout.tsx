import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: black;
    color: #fff;
    font-family: Arial, sans-serif;
    width: 100%;
    display: grid;
    grid-auto-flow: row;
    background-color: #0D101B;
  }
  * {
    box-sizing: border-box;
  }
`;

const LayoutWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-items: center;
  gap: 3rem;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
};

export default Layout;