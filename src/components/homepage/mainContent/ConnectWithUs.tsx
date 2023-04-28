import styled from 'styled-components';

const ConnectWithUsWrapper = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
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
    text-align: center;
  }

  .ask-questions{
    display: block;
    margin: auto;
    width: 10rem;
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
        We want to learn from you. <br />
        We would love to hear from experts like you about your experience with using modeling and simulation software. <br />
        This will help us make informed decision when designing and developing ground-breaking products.
      </div>
      <img src="/assets/ask-questions-picture.svg" alt="pictogram - let us ask you 9 quick questions" className="ask-questions" />
    </ConnectWithUsWrapper>
  );
}

export default ConnectWithUs;