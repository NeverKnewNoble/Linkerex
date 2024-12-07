import React from "react";
import Image from "next/image";
import ButtonComp from "../(elements)/ButtonComp";

const Hero = () => {
  return (
    <div className="relative bg-white bg-center bg-no-repeat w-full h-[650px] flex items-center justify-center">
      {/* Container for Text and Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-20 px-6 max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="text-center md:text-left text-black max-w-lg">
          <h1 className="text-[50px] md:text-5xl font-bold mb-4 leading-tight">
            We Link Opportunities <br />
            To You
          </h1>
          <h3 className="text-lg md:text-xl mb-6">We got the Link You Need</h3>
          <ButtonComp
            label={"Find A Job Now"}
            href={"/jobs"}
            className="hover:bg-[#ddecff] hover:text-black border hover:border-black"
          />
        </div>
        {/* Image Section */}
        <div>
          <Image
            src="/linkerex/lady.jpg"
            alt="Person"
            width={500}
            height={500}
            className="rounded shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
