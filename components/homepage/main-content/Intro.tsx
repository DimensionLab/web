"use client";

const Intro = () => {
  return (
    <div id="intro" className="bg-[#0D101B] py-16 xl:py-32 px-20 xl:px-0">
      <div className="grid grid-cols-4 gap-4 grid-flow-row max-w-[1280px] mx-auto">
        <div className="col-span-3 z-10">
          <img src="/assets/branding/dl-title-intro.svg" className="w-[32rem] mb-24" alt="Dimension Lab company name" />

          <div className="text-4xl xl:text-6xl font-[800] mb-2 text-[#EBEDFA] z-10 mb-10">We build next-generation <br />engineering & scientific software.</div>
          {/* <div className="text-xl text-[#B4B6C3]">Unlocking you to design the technology of the future. Better and faster.</div> */}
        </div>
        <div className="hidden xl:inline-block">
          <img src="assets/component-assets/dl-outlined-background-intro.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Intro;