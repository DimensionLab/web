"use client";

export default function Mission() {
  return (
    <div id="mission" className="bg-[#0D101B] py-16 xl:py-32 px-20 xl:px-0 grid xl:gap-4 xl:grid-flow-col max-w-[1280px] mx-auto">
      <div className="w-0 z-10 -ml-36 invisible xl:visible">
        <div className="text-2xl -rotate-90 tracking-widest inline-flex text-gray-500">
          <span className="mr-[5.8rem] uppercase">Mission</span>
        </div>
      </div>
      <div className="block xl:col-span-3 z-10">
        <div className="visible xl:hidden text-xl sm:text-2xl inline-block tracking-widest text-gray-500 pb-4 xl:pb-10">
          <span className="uppercase">Mission</span>
        </div>
        <div className="text-white text-xl sm:text-2xl leading-8 pb-4 xl:pb-10">
          Unlock{" "}
          <span className="font-bold">real-time engineering simulation</span>{" "}
          leveraging AI, while{" "}
          <span className="font-bold">
            rethinking and innovating the UX of a software that delivers it
          </span>
          , to make it accessible for{" "}
          <span className="font-bold">much wider user base</span>.
        </div>
        <div className="text-white text-xl sm:text-2xl leading-8 pb-4 xl:pb-10">
          We want to{" "}
          <span className="font-bold">
            completely redefine the virtual prototyping
          </span>{" "}
          of physical products and technologies, while{" "}
          <span className="font-bold">
            building the world&apos;s largest marketplace of foundational models
            for engineering and science
          </span>{" "}
          in the process.
        </div>
      </div>
      <div className="block xl:col-span-3">
        <video
          src="/assets/heatsink-sim.mp4"
          autoPlay={true}
          loop={true}
          style={{
            maskImage:
              "-webkit-radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />
        <figcaption className="-mt-4 text-xs leading-8 pb-4 xl:pb-10 text-gray-700 float-right">Source: NVIDIA</figcaption>
      </div>
    </div>
  );
}
