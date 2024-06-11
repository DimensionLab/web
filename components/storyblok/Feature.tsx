import { storyblokEditable } from "@storyblok/react/rsc";
 
const Feature = ({ blok }: any) => (
  <div  {...storyblokEditable(blok)}>
    {blok.name}
  </div>
);
 
export default Feature;