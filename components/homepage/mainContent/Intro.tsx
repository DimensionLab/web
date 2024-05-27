"use client";
// const IntroWrapper = styled.section`
//   display: grid;
//   grid-auto-flow: row;
//   align-items: center;
//   justify-items: start;
//   background-color: #0D101B;
//   color: #fff;
//   gap: 1rem;
//   width: 100%;
//   padding: 3rem 1rem 3rem 1rem;
//   position: relative;

//   .company-name {
//     z-index: 2;
//     img{
//       width: 18rem;
//     }
//   }
//   .heading {
//     font-size: 2.5rem;
//     font-weight: 800;
//     // max-width: 30ch;
//     margin-bottom: 0.3rem;
//     color: #EBEDFA;
//     z-index: 2;
//   }

//   .message {
//     color: #B4B6C3;
//     font-size: 1.45rem;
//     z-index: 2;
//   }

//   .bg-dl-logo {
//     position: absolute;
//     right: 15rem;

//     @media(max-width: 768px) {
//       display: none;
//     }
//   }
// `;

const Intro = () => {
  return (
    <div className="bg-[#0D101B] py-32 px-2">
      <div className="grid grid-cols-4 gap-4 grid-flow-row max-w-[1280px] mx-auto">
        <div className="col-span-3 z-10">
          <img src="/assets/branding/dl-title-intro.svg" className="w-[32rem] mb-10" alt="Dimension Lab company name" />

          <div className="text-6xl font-[800] mb-2 text-[#EBEDFA] z-10 mb-10">We build next-generation <br />engineering & scientific software.</div>
          {/* <div className="text-xl text-[#B4B6C3]">Unlocking you to design the technology of the future. Better and faster.</div> */}
        </div>
        <div className="">
          <img src="assets/component-assets/dl-outlined-background-intro.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Intro;