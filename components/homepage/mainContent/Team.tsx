// const CategoryFeaturesWrapper = styled.section`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   padding: 3rem 1rem 3rem 1rem;
//   row-gap: 0.5rem;
//   column-gap: 0.5rem;

import Image from "next/image";

//   .card {
//     display: flex;
//     flex-direction: column;
//     background-color: #010012;
//     padding: 1rem;
//     padding-bottom: 3.5rem;
//     border-radius: 4px;
//     justify-content: flex-end;
//     align-items: flex-start;
//     // align-content: flex-end;
//     height: 20rem;
//     overflow: hidden;

//     .heading-line{
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//       margin-bottom: 1rem;

//       .brain-image {
//         padding-bottom: 1rem;
//         img {

//         }
//       }

//       .heading {
//         font-size: 1.3rem;
//         font-weight: 700;
//       }
//       .line{
//         display: block;
//         width: 100%;
//         height: 4px;
//         background: linear-gradient(90deg, #7CA8FF 0%, #D28DF7 100%);
//         border-radius: 1rem;
//         color: transparent;
//         border: 0px solid transparent;
//       }
//     }
//     .description{
//       font-size: 0.8rem;
//       color: #FAFAFF;
//       padding-bottom: 1rem;
//       height: 3rem;
//       display: inline-block;
//     }
//   }

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     row-gap: 1rem;
//   }

//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(4, 1fr);
//     row-gap: 1rem;
//   }
// `;

interface PeopleProps {
  name: string;
  bio: string;
  image: string;
}

export default function Team() {
  const peopleData: PeopleProps[] = [
    {
      name: "Michal Takáč, PhD.",
      bio: "Co-founder & CEO. Senior software engineer and serial entrepreneur across diverse industries like gaming, VR, crypto and deep-tech. PhD in Cybernetics with the focus on human-computer interaction in real-time engineering.",
      image: "/assets/team/michal-takac.jpg",
    },
    {
      name: "Peter Macinský",
      bio: "Co-founder & CFO. Strategic manager, serial entrepreneur in fintech.",
      image: "/assets/team/peter-macinsky.png",
    },
    {
      name: "Branislav Kršák, PhD.",
      bio: "Co-founder & BizDev. Associate professor and academic consultant in 100+ international projects, principal investigator in 27 international projects, R&D commercialization facilitator.",
      image: "/assets/team/branislav-krsak.png",
    },
    {
      name: "Martin Muzelák",
      bio: "Co-founder, engineering manager. Previously software engineer at IBM. PhD. candidate in Cybernetics, focusing on applying ML to physical simulation.",
      image: "/assets/team/martin-muzelak.png",
    },
    {
      name: "Andrea Tešanović",
      bio: "Head of marketing. Digital marketing specialist in multimedia production and strategic communications.",
      image: "/assets/team/andrea-tesanovic.png",
    },
    {
      name: "Maroš Pekarik",
      bio: "Senior software engineer and interaction designer with 8+ years of experience. Creative technologist active in robotics and immersive media art.",
      image: "/assets/team/maros-pekarik.png",
    },
    {
      name: "Marek Ružička, PhD.",
      bio: "Lead machine learning researcher, focusing on ML for physics and engineering.",
      image: "/assets/team/marek-ruzicka.jpeg",
    },
    {
      name: "Tomáš Hrib",
      bio: "Frontend developer and software engineer experienced across full-stack.",
      image: "/assets/team/tomas-hrib.jpeg",
    },
    {
      name: "Selva Prasad",
      bio: "Senior backend developer and software enineerwith 20+ years of experience in leading diverse teams across the globe. SAFe agilist, SDLC, DevOps.",
      image: "/assets/team/selva-prasad.jpeg",
    },
    {
      name: "Matúš Hančikovský",
      bio: "Simulation engineer experienced in Computational Fluid Dynamics and Finite Element Analysis. Developing ML algorithms for building neural physics simulators.",
      image: "/assets/team/matus-hancikovsky.png",
    },
    {
      name: "Dávid Jopek",
      bio: "Physicist tackling both theory and applications, focusing on applying ML in Computational Fluid Dynamics (PhysicsML).",
      image: "/assets/team/david-jopek.png",
    },
  ];
  return (
    <div id="team" className="bg-[#0D101B] py-16 xl:py-32 px-20 xl:px-0 grid xl:gap-4 xl:grid-flow-col max-w-[1280px] mx-auto">
      <div className="w-0 z-10 -ml-24 invisible xl:visible">
        <div className="text-2xl -rotate-90 tracking-widest inline-flex text-gray-500">
          <span className="mr-[2.5rem] uppercase">Team</span>
        </div>
      </div>
      <div className="z-10">
        <div className="visible xl:hidden text-xl sm:text-2xl inline-block tracking-widest text-gray-500 pb-4 xl:pb-10">
          <span className="uppercase">Team</span>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
          {peopleData.map((card) => (
            <div key={card.name} className="">
              <div className="flex flex-col w-full mb-2">
                <div className="pb-2 h-[290px]">
                  <Image
                    className="object-cover"
                    src={card.image}
                    alt={card.name}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    width={300}
                    height={290}
                  />
                </div>
                <div className="text-[#FAFAFF] py-4 text-xl font-bold">
                  {card.name}
                </div>
              </div>
              <div className="inline-block text-sm text-[#FAFAFF]">
                {card.bio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
