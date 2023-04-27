import styled from "styled-components";

const CategoryFeaturesWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 3rem;
  padding-right: 3rem;

  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    

    .heading {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .description{
      font-size: 0.8rem;
      color: #D0D2DF;
    }
`;

interface CardProps {
  title: string;
  content: string;
}

const CategoryFeatures = () => {
  const cardData: CardProps[] = [
    { title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Card 2', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Card 3', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { title: 'Card 4', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'Card 5', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { title: 'Card 6', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    { title: 'Card 7', content: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' },
    { title: 'Card 8', content: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.' },
  ];
  return (
    <CategoryFeaturesWrapper>
      {cardData.map((card) => (
        <div key={card.title} className="card">
          <div className="heading">{card.title}</div>
          <div className="description">{card.content}</div>
        </div>
      ))}
    </CategoryFeaturesWrapper>
  );
};

export default CategoryFeatures;