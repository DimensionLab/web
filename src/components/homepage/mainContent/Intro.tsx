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
  padding-left: 3rem;
  padding-right: 3rem;

  .logo {
    img{
      width: 3rem;
      margin-bottom: 2rem;
    }
  }
  .heading {
    font-size: 1.7rem;
    font-weight: 700;
    max-width: 30ch;
    margin-bottom: 0.3rem;
  }

  .message {
    color: #D0D2DF;
    font-size: 0.8rem;
  }
`;

const Intro = () => {
  return (
    <IntroWrapper>
      <div className="logo">
        <img src="/assets/logo_D.svg" alt="Dimension Lab logo" />
      </div>
      <div className="heading">We build next-generation engineering & scientific software.</div>
      <div className="message">Unlocking you to design the technology of the future. Better and faster.</div>
    </IntroWrapper>
  );
};

export default Intro;