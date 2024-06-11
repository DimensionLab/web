import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
 
const Grid = ({ blok }: any) => {
  return (
    <div  {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
 
export default Grid;