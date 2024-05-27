import Intro from "@/components/homepage/mainContent/Intro";
import CaregoryFeatures from "@/components/homepage/mainContent/CaregoryFeatures";
import SimlIntro from "@/components/homepage/mainContent/SimlIntro";
import ConnectWithUs from "@/components/homepage/mainContent/ConnectWithUs";
import Mission from "./mainContent/Mission";
import Team from "./mainContent/Team";


const Main = () => {
  return (
    <div className="display-grid w-full h-full min-h-[90vh] gap-2">
      <Intro />
      <Mission />
      <SimlIntro />
      <Team />
    </div>
  );
};

export default Main;