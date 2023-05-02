import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: #010012;
  width: 100%;
  color: #fff;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    justify-items: end;
    align-items: start;
    padding-top: 10rem;
    padding-bottom: 10rem;
  }

  .logo {
    display: flex;

    @media (min-width: 768px) {
      width: 100%;
      align-self: start;
    }

    @media (min-width: 1200px) {
      padding-left: 10rem;
    }

    img {
      width: 4rem;

      @media (min-width: 768px) {
        width: 4rem;
      }

      @media (min-width: 1200px) {
        width: 7rem;
      }
    }
  }
  .products {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      width: 100%;
      align-self: start;
    }

    .title {
      font-size: 1.4rem;
      font-weight: 700;

      @media (min-width: 768px) {
        align-self: start;
      }
    }
    .simlai-redirect {
      font-size: 1rem;
      color: white;
      text-decoration: none;
      border-bottom: 2px solid #2460FF;
      transition: all 0.3s ease-in-out;

      @media (min-width: 768px) {
        align-self: start;
      }

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  .useful-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      width: 100%;
      align-self: start;
    }

    .title {
      font-size: 1.4rem;
      font-weight: 700;

      @media (min-width: 768px) {
        align-self: start;
      }
    }

    a {
      font-size: 1rem;
      color: white;
      text-decoration: none;
      border-bottom: 2px solid #2460FF;
      transition: all 0.3s ease-in-out;

      @media (min-width: 768px) {
        align-self: start;
      }

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  .contact-us {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      align-items: start;
      width: 100%;
    }

    .title {
      font-size: 1.4rem;
      font-weight: 700;
    }

    .location {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
    .tel-contact {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: all 0.3s ease-in-out;
      
      .tel-number {
        text-decoration: none;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
    .email-contact {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className='logo'>
        <img src="assets/logo_D.svg" alt="" />
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
          <div className="location">
            <span className="material-symbols-outlined">location_on</span>
            <div className="address">Lomnická 2, 040 01 Košice, Slovakia</div>
          </div>
          <div className="tel-contact">
          <span className="material-symbols-outlined">call</span>
            <div className="tel-number">+421 911 334 797</div>
          </div>
          <div className="email-contact">
          <span className="material-symbols-outlined">mail</span>
            <div className="email">hello@dimensiolab.org</div>
          </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;