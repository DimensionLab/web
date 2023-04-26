import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  background-color: #0D101B;
  width: 100%;
  color: #fff;
  gap: 1rem;

  .title {
    font-size: 0.8rem;
    align-self: flex-start;
    margin-left: 1rem;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="title">DimensionLab</div>
    </HeaderWrapper>
  );
};

export default Header;