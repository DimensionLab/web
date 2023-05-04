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
  position: relative;

  .company-name {
    z-index: 2;
    img{
      width: 18rem;
    }
  }
  .heading {
    font-size: 2.5rem;
    font-weight: 800;
    // max-width: 30ch;
    margin-bottom: 0.3rem;
    color: #EBEDFA;
    z-index: 2;
  }

  .message {
    color: #B4B6C3;
    font-size: 1.45rem;
    z-index: 2;
  }

  .bg-dl-logo {
    position: absolute;
    right: 15rem;

    @media(max-width: 768px) {
      display: none;
    }
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
      <div className="bg-dl-logo">
        <img src="assets/component-assets/dl-outlined-background-intro.svg" alt="" />
      </div>
    </IntroWrapper>
  );
};

export default Intro;