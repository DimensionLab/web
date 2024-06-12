"use client";

import Image from "next/image";
import css from "@/components/componentStyles/headerDL.module.css";
import classNames from "classnames";

const Intro = () => {
  return (
    <div id="intro" className="py-16 xl:py-32 px-8 xl:mt-10 sm:px-20 xl:px-0">
      <div className="xl:grid xl:grid-cols-4 gap-0 grid-flow-row max-w-[1280px] mx-auto">
        <div className="col-span-2 z-10">
          <div className="text-5xl xl:text-[4rem] font-[800] mb-2 text-[#EBEDFA] z-10 mb-10 leading-tight"><span>We speed up your simulations with </span>
          <p className={classNames(css.videoizedText, "max-xl:hidden inline-block text-transparent drop-shadow-lg")}>the power of AI</p>
          <p className="xl:hidden bg-gradient-to-r from-blue-500 via-blue-300 to-purple-600 inline-block text-transparent bg-clip-text drop-shadow-lg">the power of AI</p>.</div>
          <div className="text-2xl text-[#EBEDFA] z-10 py-16">Unlocking you to design the technology of the future. Better and faster.</div>
        </div>
        <div className="hidden xl:inline-block col-span-2 -mt-[30px]">
          <Image
            src="/assets/simulations-of-future.png"
            alt=""
            width={1280}
            height={550}
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;