import styled from "styled-components";
import Intro from "./mainContent/Intro";

const MainWrapper = styled.main`
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  min-height: 90vh;
  width: 100%;
  height: 100%;
`;

const Main = () => {
  return (
    <MainWrapper>
      <Intro />
      <div>placeholder</div>
    </MainWrapper>
  );
};

export default Main;