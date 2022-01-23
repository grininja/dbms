import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Footer from './Footer';
import NavBar2 from './NavBar2';
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <NavBar2 />
        {children}
      <Footer />
    </Wrapper>
  )
}

export default Layout
