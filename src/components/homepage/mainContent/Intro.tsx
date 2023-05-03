import styled from "styled-components";

const IntroWrapper = styled.section`
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: start;
  background-color: #0D101B;
  color: #fff;
  gap: 1rem;
  width: 100%;
  padding: 3rem 1rem 3rem 1rem;

  .company-name {
    img{
      width: 18rem;
    }
  }
  .heading {
    font-size: 2.5rem;
    font-weight: 800;
    max-width: 30ch;
    margin-bottom: 0.3rem;
    color: #EBEDFA;
  }

  .message {
    color: #B4B6C3;
    font-size: 1.45rem;
  }
`;

const Intro = () => {
  return (
    <IntroWrapper>
      <div className="company-name">
        <img src="/assets/branding/dl-title-intro.svg" alt="Dimension Lab company name" />
      </div>
      <div className="heading">We build <br/> next-generation engineering <br/> & scientific software.</div>
      <div className="message">Unlocking you to design <br/> the technology of the future. <br/> Better and faster.</div>
    </IntroWrapper>
  );
};

export default Intro;