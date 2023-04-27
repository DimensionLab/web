import styled from "styled-components";

const CategoryFeaturesWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 3rem;
  padding-right: 3rem;
  row-gap: 0.5rem;
  column-gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: #010012;
    padding: 1rem;
    height: 40vh;
    border-radius: 4px;
    justify-content: end;
    align-items: space-between;
    position: relative;

    .blank-half {
      width: 100%;
      height: 50%;
    }

    .content-half {
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      

      .heading {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .line{
        position: absolute;
        bottom: 5rem;
        width: 90%;
        height: 4px;
        background-color: #2460FF;
        border-radius: 4px;
        color: #2460FF;
      }
      .description{
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #7C7F8B;
        padding-bottom: 1rem;
      }
    }

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
          <div className="blank-half"></div>
          <div className="content-half">
            <div className="heading">{card.title}</div>
            <hr className="line"/>
            <div className="description">{card.content}</div>
          </div>
        </div>
      ))}
    </CategoryFeaturesWrapper>
  );
};

export default CategoryFeatures;