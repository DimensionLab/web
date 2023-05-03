import styled from "styled-components";

const SimlIntroWrapper = styled.section`
  display: grid;
  width: 100%;
  padding: 2rem 1rem 2rem 1rem;
  grid-auto-flow: row;
  align-items: center;
  justify-items: start;
  gap: 3rem;

  .logos{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-items: flex-start;
    gap: 1.2rem;

    .products-vertical-text {
      margin: 0;
      padding: 0;
      writing-mode: vertical-lr;
      transform: rotate(-180deg);
      color: #61646F;
    }

    img {
      margin: 0;
      padding: 0;
    }

    @media (min-width: 900px) {
      column-gap: 30rem;
    }
  }

  .brandName{
    padding-left: 2.5rem;
    img {
      width: 12rem;
    }
  }

  .heading{
    padding-left: 2.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: start;
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
      <div className="logos">
        <div className="products-vertical-text">PRODUCTS</div>
        <img src="/assets/siml_outline_logo.svg" alt="siml logo" />
      </div>
      <div className="brandName">
        <img src="assets/branding/simlai-title-siml-intro.svg" alt="siml ai name title" />
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