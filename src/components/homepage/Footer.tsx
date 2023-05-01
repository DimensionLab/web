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
      <div className='logo'>
        <img src="" alt="" />
      </div>
      <div className="products">
        <div className='title'>PRODUCTS</div>
        <a href="https://siml.ai" className='simlai-redirect'>SIML.ai</a>
      </div>
      <div className="useful-links">
        <div className='title'>USEFUL LINKS</div>
        <a href="">Contact</a>
        <a href="">Terms & Conditions</a>
        <a href="">Privacy Policy</a>
      </div>
      <div className="contact-us">
        <div className='title'>CONTACT US</div>
        
      </div>
    </FooterWrapper>
  );
};

export default Footer;