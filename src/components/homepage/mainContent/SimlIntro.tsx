import styled from "styled-components";

const SimlIntroWrapper = styled.section`
  display: grid;
  width: 100%;
  padding: 2rem 1rem 2rem 1rem;
  grid-auto-flow: row;
  align-items: center;
  justify-items: start;
  gap: 3rem;

  .heading-container {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    @media(min-width: 1024px) {
      flex-direction: row;
    }

    .logos{
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-items: flex-start;
      gap: 1.2rem;
  
      .products-vertical-text {
        display: flex;
        align-self: end;
        margin: 0;
        padding: 0;
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        color: #61646F;
      }
  
      img {
        display: flex;
        align-self: end;
        margin: 0;
        padding: 0;
      }
    }
    }
  
    .brandName{
      display: flex;
      padding-left: 2.5rem;
      justify-self: center;
      align-self: end;
      img {
        width: 13rem;
      }
    }
  }

  .heading{
    padding-left: 2.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: start;

    @media(min-width: 1024px) {
      font-size: 3rem;
      max-width: 70%;
    }
  }

  a {
    padding-left: 2.5rem;
    .view-more {
    }
  }
`;

const SimlIntro = () => {
  return (
    <SimlIntroWrapper>
      <div className="heading-container">
        <div className="logos">
          <div className="products-vertical-text">PRODUCTS</div>
          <img src="/assets/branding/siml-intro-logo2.svg" alt="siml logo" />
        </div>
        <div className="brandName">
          <img src="assets/branding/simlai-title-siml-intro.svg" alt="siml ai name title" />
        </div>
      </div>
      <div className="heading">Software platform <br/> for high-performance AI-based numerical simulators.</div>
      <div className="view-more">
        <a href="">
          <img src="assets/component-assets/button-view-more-siml-intro.svg" alt="" />
        </a>
      </div>
    </SimlIntroWrapper>
  );
};

export default SimlIntro;