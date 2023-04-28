import styled from 'styled-components';

const ConnectWithUsWrapper = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  padding-left: 3rem;
  padding-right: 3rem;
  align-content: center;
  justify-content: center;
  min-height: 30vh;

  .headings{
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .small-title{
      color: #fff;
      font-size: 1rem;
      text-align: start;
    }

    .big-title{
      color: #fff;
      font-size: 1.5rem;
      text-align: start;
    }
  }

  .description-box{
    display: flex;
    text-align: start;
    font-size: 0.8rem;
    color: #EBEDFA;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;

    br {
      padding: 2rem;
    }
  }

  .ask-questions{
    display: flex;
    width: 10rem;
    justify-self: end;
    align-self: center;

    @media (max-width: 768px) {
      justify-self: center;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ConnectWithUs = () => {
  return (
    <ConnectWithUsWrapper>
      <div className="headings">
        <div className="small-title">LET'S CONNECT!</div>
        <div className="big-title">Do you use any physics-based simulation software?</div>
      </div>
      <div className="description-box">
        <div>We want to learn from you.</div>
        <div>We would love to hear from experts like you about your experience with using modeling and simulation software.</div>
        <div>This will help us make informed decision when designing and developing ground-breaking products.</div>
      </div>
      <img src="/assets/ask-questions-picture.svg" alt="pictogram - let us ask you 9 quick questions" className="ask-questions" />
    </ConnectWithUsWrapper>
  );
}

export default ConnectWithUs;