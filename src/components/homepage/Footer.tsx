import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: #010012;
  width: 100%;
  color: #fff;
  gap: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>DimensionLab</div>
    </FooterWrapper>
  );
};

export default Footer;