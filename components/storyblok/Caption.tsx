import { storyblokEditable } from "@storyblok/react/rsc";
 
const Caption = ({ blok }: any) => (
  <figcaption className="text-muted text-sm" {...storyblokEditable(blok)}>
    {blok.content}
  </figcaption>
);
 
export default Caption;