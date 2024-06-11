import Image from "next/image";

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
      image: "/assets/team/marek-ruzicka.jpg",
    },
    {
      name: "Tomáš Hrib",
      bio: "Frontend developer and software engineer experienced across full-stack.",
      image: "/assets/team/tomas-hrib.jpeg",
    },
    {
      name: "Selva Prasad",
      bio: "Senior backend developer and software enineerwith 20+ years of experience in leading diverse teams across the globe. SAFe agilist, SDLC, DevOps.",
      image: "/assets/team/selva-prasad.jpg",
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
    <div id="team" className="py-16 xl:py-32 px-20 xl:px-0 grid xl:gap-4 xl:grid-flow-col max-w-[1280px] mx-auto">
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
                    className="object-cover grayscale"
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
