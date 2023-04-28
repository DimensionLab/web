import styled from "styled-components";

const SimlIntroWrapper = styled.section`
  display: grid;
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  grid-auto-flow: row;
  align-items: center;
  justify-items: start;
  gap: 3rem;

  .logos{
    display: flex;
    width: 100%;
    column-gap: 10rem;
  }

  .brandName{
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    // padding-bottom: 1rem;
  }

  .heading{
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    // max-width: 40%;
    text-align: start;
  }
`;

const SimlIntro = () => {
  return (
    <SimlIntroWrapper>
      <div className="logos">
        <img src="/assets/siml_outline_logo.svg" alt="siml logo" />
        <img src="/assets/siml_S_outline_logo.svg" alt="siml logo" />
      </div>
      <div className="brandName">SIML.AI</div>
      <div className="heading">Software platform for working with high-performance AI-based numerical simulators.</div>
    </SimlIntroWrapper>
  );
};

export default SimlIntro;