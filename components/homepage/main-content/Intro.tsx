"use client";

const Intro = () => {
  return (
    <div id="intro" className="py-16 xl:py-32 px-20 xl:px-0">
      <div className="grid grid-cols-4 gap-4 grid-flow-row max-w-[1280px] mx-auto">
        <div className="col-span-3 z-10">
          <div className="text-5xl xl:text-7xl font-[800] mb-2 text-[#EBEDFA] z-10 mb-10">We speed up your <br />engineering simulation with <span className="bg-gradient-to-r from-blue-500 via-blue-300 to-purple-600 inline-block text-transparent bg-clip-text drop-shadow-lg">the power of AI</span>.</div>
          <div className="text-2xl text-[#EBEDFA] z-10 py-10">Unlocking you to design the technology of the future. Better and faster.</div>
        </div>
        <div className="hidden xl:inline-block">
          <svg width="260" height="260" viewBox="0 0 260 260" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M129.975 0H0V260H129.975C164.459 260 197.532 246.304 221.916 221.924C246.301 197.544 260 164.478 260 130C260 95.5219 246.301 62.4558 221.916 38.0761C197.532 13.6964 164.459 0 129.975 0ZM10.9629 129.031L62.2593 77.7451V189.902L10.9629 241.137V129.031ZM18.7645 248.937L70.0098 197.651H129.975C134.615 197.66 139.245 197.199 143.793 196.275L91.1198 248.937H18.7645ZM73.2222 73.2078H129.975C141.004 73.1599 151.807 76.3289 161.062 82.3268C170.318 88.3247 177.622 96.8911 182.081 106.977C186.541 117.062 187.961 128.229 186.169 139.11C184.377 149.99 179.449 160.112 171.991 168.235C170.759 169.619 169.448 170.93 168.064 172.161C157.655 181.657 144.066 186.913 129.975 186.894H73.2222V73.2078ZM129.975 248.937H106.621L176.172 179.4L179.435 176.137L179.894 175.678C188.769 165.992 194.633 153.933 196.772 140.971C198.912 128.01 197.233 114.707 191.941 102.683C186.65 90.6588 177.974 80.4337 166.971 73.2539C155.968 66.0741 143.114 62.2498 129.975 62.2471H62.2593L10.9629 113.482V10.9608H129.975C161.538 10.9608 191.809 23.497 214.128 45.8116C236.447 68.1263 248.986 98.3914 248.986 129.949C248.986 161.507 236.447 191.772 214.128 214.086C191.809 236.401 161.538 248.937 129.975 248.937Z" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Intro;