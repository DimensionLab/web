"use client";

import Image from "next/image";
import Link from "next/link";

export default function Product() {
  return (
    <div id="product" className="py:8 sm:py-16 xl:py-32 px-8 sm:px-20 xl:px-0 max-w-[1280px] mx-auto">
      <div className="grid xl:gap-4 xl:grid-flow-col">
        <div className="w-0 z-10 -ml-36 invisible xl:visible">
          <div className="text-2xl -rotate-90 tracking-widest inline-flex text-gray-500">
            <span className="mr-[5.8rem] uppercase">Product</span>
          </div>
        </div>
        <div className="block md:col-span-2 z-10">
          <div className="visible xl:hidden text-whitetext-xl sm:text-2xl inline-block tracking-widest text-gray-500 pb-4 xl:pb-10">
            <span className="uppercase">Product</span>
          </div>
          <div className="text-white text-xl sm:text-2xl xl:leading-8 pb-10">
            Developing reliable high-tech products is{" "}
            <span className="font-bold">HARD</span>.
          </div>
          <div className="text-white text-xl sm:text-2xl xl:leading-8 pb-10">
            Simulation is one of the most important tools for prototyping across
            automotive, aerospace, energy or biomedical industries.
          </div>
          <div className="text-white text-xl sm:text-2xl xl:leading-8 pb-10">
            Virtual prototyping still takes months with available simulation
            tools.
          </div>
          <div className="xl:hidden block md:col-span-4 max-xl:mb-8">
            <Image
              src="/assets/simlai-model-engineer-mar-2024.png"
              alt=""
              className="xs:max-w-[300px] md:max-w-[800px] w-full mx-auto"
              width={1280}
              height={550}
            />
          </div>
          <div className="mb-4 text-white text-2xl xl:text-3xl font-bold xl:leading-10">
            We built{" "}
            <Link
              href="https://siml.ai"
              className="inline-flex flex-row items-baseline gap-x-2 inline hover:bg-gradient-to-r from-blue-500 via-blue-300 to-purple-600 bg-[length:100%_2px] hover:bg-[length:100%_10px] duration-300 bg-no-repeat bg-bottom"
              target="_blank"
            >
              <Image
                src="/assets/simlai-logo.svg"
                alt=""
                width={50}
                height={50}
              />
              <h2 className="text-4xl font-black">Siml.ai</h2>
            </Link>{" "}
            platform to make this process more than{" "}
            <span className="xl:text-4xl bg-gradient-to-b from-yellow-300 via-orange-400 to-red-600 inline-block text-transparent bg-clip-text">
              1000x
            </span>{" "}
            faster and easier.
          </div>
        </div>
        <div className="xl:block hidden md:col-span-3">
          <Image
            src="/assets/simlai-model-engineer-mar-2024.png"
            alt=""
            width={1280}
            height={550}
          />
        </div>
      </div>
      <div className="w-full py-8 xl:py-32">
        <div className="text-white text-2xl xl:text-3xl font-bold leading-8 text-center mx-auto w-[fit-content]">
          Read more about{" "}
          <div className="inline-flex flex-row items-baseline gap-x-2 inline">
            <Image
              src="/assets/simlai-logo.svg"
              alt=""
              width={50}
              height={50}
            />
            <h2 className="text-4xl font-black">Siml.ai</h2>
          </div>{" "}
          on the product&apos;s{" "}
          <Link
            href="/products/simlai"
            className="bg-gradient-to-r from-blue-500 via-blue-300 to-purple-600 bg-[length:100%_2px] hover:bg-[length:100%_10px] duration-300 bg-no-repeat bg-bottom"
          >
            page
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
