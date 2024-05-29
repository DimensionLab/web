import Intro from "@/components/homepage/mainContent/Intro";
import Mission from "./mainContent/Mission";
import Team from "./mainContent/Team";
import Product from "./mainContent/Product";


const Main = () => {
  return (
    <div className="display-grid w-full h-full min-h-[90vh] gap-2">
      <Intro />
      <Mission />
      <Product />
      <Team />
    </div>
  );
};

export default Main;