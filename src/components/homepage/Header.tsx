import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #0D101B;
  width: 100%;
  color: #fff;
  gap: 1rem;
  padding: 3rem 1rem 3rem 1rem;

  .title-logo {
    font-size: 0.8rem;
    align-self: flex-start;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="title-logo">
        <img src="assets/branding/header-logo-dl.svg" alt="" />
      </div>
      <div className="hamburger-menu">
        <img src="assets/component-assets/hamburger-menu-header.svg" alt="" />
      </div>
    </HeaderWrapper>
  );
};

export default Header;