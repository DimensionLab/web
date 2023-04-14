import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #000;
    color: #fff;
    font-family: Arial, sans-serif;
  }
`;

const LayoutWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
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