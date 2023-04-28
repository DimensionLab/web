import styled from "styled-components";
import Intro from "./mainContent/Intro";
import CaregoryFeatures from "./mainContent/CaregoryFeatures";
import SimlIntro from "./mainContent/SimlIntro";
import ConnectWithUs from "./mainContent/ConnectWithUs";

const MainWrapper = styled.main`
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  background-color: #0D101B;
  min-height: 90vh;
  width: 100%;
  height: 100%;
  gap: 10rem;

  .placeholder {
    background-color: black;
    width: 100%;
    height: 100%;
  }
`;

const Main = () => {
  return (
    <MainWrapper>
      <Intro />
      <CaregoryFeatures />
      <SimlIntro />
      <ConnectWithUs />
    </MainWrapper>
  );
};

export default Main;