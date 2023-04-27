import styled from "styled-components";

const SimlIntroWrapper = styled.section`
  display: grid;
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  grid-auto-flow: row;
  align-items: center;
  justify-items: start;
  gap: 2rem;

  .logos{
    display: flex;
    width: 100%;
    column-gap: 35rem;
  }

  .brandName{
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    padding-bottom: 1rem;
  }

  .heading{
    font-size: 1.7rem;
    font-weight: 700;
    color: #fff;
    max-width: 40%;
    text-wrap: wrap;
  }

  @media (max-width: 768px) {
    .logos{
      display: flex;
      width: 100%;
      column-gap: 4rem;

      img{
        width: 3rem;
      }
    }

    .brandName{
      font-size: 1.5rem;
      text-align: center;
    }

    .heading{
      font-size: 1.2rem;
      max-width: 100%;
      text-wrap: wrap;
      text-align: left;
    }
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