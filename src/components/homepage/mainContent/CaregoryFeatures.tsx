import styled from "styled-components";

const CategoryFeaturesWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 3rem 1rem 3rem 1rem;
  row-gap: 0.5rem;
  column-gap: 0.5rem;

  .card {
    display: flex;
    flex-direction: column;
    background-color: #010012;
    padding: 1rem;
    padding-bottom: 3.5rem;
    border-radius: 4px;
    justify-content: flex-end;
    align-items: flex-start;
    // align-content: flex-end;
    height: 20rem;
    overflow: hidden;

    
    .heading-line{
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;

      .brain-image {
        padding-bottom: 1rem;
        img {

        }
      }

      .heading {
        font-size: 1.3rem;
        font-weight: 700;
      }
      .line{
        display: block;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #7CA8FF 0%, #D28DF7 100%);
        border-radius: 1rem;
        color: transparent;
        border: 0px solid transparent;
      }
    }
    .description{
      font-size: 0.8rem;
      color: #FAFAFF;
      padding-bottom: 1rem;
      height: 3rem;
      display: inline-block;
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 1rem;
  }
`;

interface CardProps {
  title: string;
  content: string;
}

const CategoryFeatures = () => {
  const cardData: CardProps[] = [
    { title: 'SPEED & EFFICIENCY', content: 'Our software responds to your input in real-time, which means interactive visualization - nothing less.' },
    { title: 'ELASTIC COMPUTE', content: 'Use as much computing power as you need - from a single GPU to supercomputer. All of the number-crunching happens in the cloud.' },
    { title: 'PHYSICS & AI', content: 'We combine state of the art physics simulation with machine learning.' },
    { title: 'EVOLVING SOFTWARE', content: 'Using our products by individuals and companies with diverse goals evolves our software automatically. We sewed this evolutionary approach into the fabric of our products.' },
    { title: 'CLEAN DESIGN', content: 'We are completely rethinking how engineering and scientific software could look and feel.' },
    { title: 'WEB BASED', content: 'No need to install anything or be limited to number of specific platforms. Everything happens through web interface.' },
    { title: 'ANALYTICS', content: 'Metrics are key. We measure everything that can have value for you and show it to you in a meaningful way.' },
    { title: 'UNLOCKING POSSIBILITIES', content: 'We want to empower as many people as possible by making tools they can use to develop technology of the future.' },
  ];
  return (
    <CategoryFeaturesWrapper>
      {cardData.map((card) => (
        <div key={card.title} className="card">
          <div className="heading-line">
            <div className="brain-image">
              <img src="assets/component-assets/brain-caregory-features-card.svg" alt="" />
            </div>
            <div className="heading">{card.title}</div>
            <hr className="line"/>
          </div>
          <div className="description">{card.content}</div>
        </div>
      ))}
    </CategoryFeaturesWrapper>
  );
};

export default CategoryFeatures;