import Intro from "@/components/homepage/main-content/Intro";
import Mission from "./main-content/Mission";
import Team from "./main-content/Team";
import Product from "./main-content/Product";

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