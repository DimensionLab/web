"use client"

import { SquareSigma } from "lucide-react"
import css from "./mission.module.css"

export default function Mission() {
    return (
        <div className="bg-[#0D101B] py-32 grid grid-cols-6 gap-4 grid-flow-row max-w-[1280px] mx-auto">
            <div className="col-span-3 z-10">
                <div className="text-white text-4xl inline-block tracking-wide"><SquareSigma className="float-left p-0 mr-4" size={40} />Our <span className="italic"><a href="#" className="text-underline">mission<svg className={css.svgmarker}><use xlinkHref="#svg_marker"></use></svg></a></span>:</div>
                <div className="text-white text-2xl py-10">Unlock <span className="font-bold">real-time engineering simulation</span> leveraging AI, while <span className="font-bold">rethinking and innovating the UX of a software that delivers it</span>, to make it accessible for <span className="font-bold">much wider user base</span>.
                </div>
                <div className="text-white text-2xl py-10">We want <span className="font-bold">completely redefine the virtual prototyping</span> of physical products and technologies, while <span className="font-bold">building the world&apos;s largest marketplace of foundational models for engineering and science</span> in the process.
                </div>
            </div>
            <div className="col-span-3"><video src="/assets/heatsink-sim.mp4" autoPlay={true} loop={true} style={{ maskImage: "-webkit-radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0))"}} /></div>
        </div>
    )
};
