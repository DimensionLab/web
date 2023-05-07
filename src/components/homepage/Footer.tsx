import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  align-items: center;
  padding: 3rem 1rem 3rem 1rem;
  background-color: #222530;
  width: 100%;
  color: #fff;
  gap: 2rem;

  .content-container{
    display: flex;
    flex-direction: column;
    padding-left: 2.5rem;
    padding-right: 1rem;
    width: 100%;
    gap: 2rem;

    @media(min-width: 1048px) {
      flex-direction: row;
    }

    @media(min-width: 1440px) {
      justify-content: space-between;
    }

    .title-socials-container {
      display:flex;
      flex-direction: column;
      row-gap: 1.5rem;
      position: relative;

      @media(min-width: 1440px) {
        justify-content: space-between;
      }

      .dl-title-image{
        width: 100%;
  
        img{
          width: 13rem;
        }
      }
  
      .socials{
        display: flex;
        flex-direction: row;
        gap: 1.5rem;

        @media(min-width: 1440px) {
          align-content: flex-end;
          position: absolute;
          bottom: 0rem;
        }
      }
    }

    .products {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .title{
        color: #61646F;
        font-size: 1rem;
      }

      .simlai {
        a {
          text-decoration: none;
          color: white;
          font-size: 1.1rem;
        }
      }
    }
    
    .explore {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .title{
        color: #61646F;
        font-size: 1rem;
      }
      .links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        a{
          text-decoration: none;
          color: white;
          font-size: 1.1rem;
        }
        .tos{}
        .privacy-policy{}
      }
    }

    .contact-us {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      gap: 0.5rem;
      padding-bottom: 2rem;

      img {
        width: 0.6rem;
      }
      
      .title {
        font-size: 1rem;
        color: #61646F;
        padding-bottom: 0.5rem;
      }

      .location{
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
      .phone{
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
      .email{
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
    }
  }
  .copyright {
    color: gray;
    display: flex;
    justify-self: flex-start;
    font-size: 0.8rem;

    @media(min-width: 1024px) {
      justify-self: flex-end;
      padding-right: 1rem;
    }
  }
}
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="content-container">
        <div className="title-socials-container">
          <div className="dl-title-image">
            <img src="assets/branding/dl-title-intro.svg" alt=""/>
          </div>
          <div className="socials">
            <div className="linkedin">
              <a href="https://www.linkedin.com/company/dimensionlab">
                <img src="assets/component-assets/footer/linkedin-logo.svg" alt="" />
              </a>
            </div>
            <div className="facebook">
              <a href="https://www.facebook.com/dimensionlab/">
                <img src="assets/component-assets/footer/facebook-logo.svg" alt="" />
              </a>
            </div>
            <div className="twitter">
              <a href="https://twitter.com/TheDimensionLab">
                <img src="assets/component-assets/footer/twitter-logo.svg" alt="" />
              </a>
            </div>
            <div className="instagram">
              <a href="">
                <img src="assets/component-assets/footer/instagram-logo.svg" alt="" />
              </a>
            </div>
            <div className="medium">
              <a href="">
                <img src="assets/component-assets/footer/medium-logo.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="products">
          <div className="title">PRODUCTS</div>
          <div className="simlai">
            <a href="https://siml.ai">SIML.ai</a>
          </div>
        </div>
        <div className="explore">
          <div className="title">EXPLORE</div>
          <div className="links">
            <div className="tos">
              <a href="">
                Terms & Conditions
              </a>
            </div>
            <div className="privacy-policy">
              <a href="">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="contact-us">
          <div className="title">CONTACT US</div>
          <div className="location">
            <img src="assets/component-assets/footer/location-icon.svg" alt="" />
            <div>Lomnická 2, 040 01 Košice, Slovakia</div>
          </div>
          <div className="phone">
            <img src="assets/component-assets/footer/phone-icon.svg" alt="" />
            <div>+421 911 334 797</div>
          </div>
          <div className="email">
            <img src="assets/component-assets/footer/email-icon.svg" alt="" />
            <div>hello@dimensionlab.org</div>
          </div>
        </div>
      </div>
      <div className="copyright">© 2023 DimensionLab s.r.o.</div>
    </FooterWrapper>
  );
};

export default Footer;