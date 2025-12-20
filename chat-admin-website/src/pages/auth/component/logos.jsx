import React from "react";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo1.png";
import logo3 from "../../../assets/logo1.png";
import logo4 from "../../../assets/logo1.png";
import logo5 from "../../../assets/logo1.png";
import logo6 from "../../../assets/logo1.png";
import logo7 from "../../../assets/logo1.png";
import logo8 from "../../../assets/logo1.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8,logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

const Logos = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto px-6">
        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Trusted by fast-growing teams worldwide
        </p>

        <marquee behavior="scroll" direction="left" scrollamount="6">
          <div className="flex items-center gap-10 px-4">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Client logo ${index + 1}`}
                className="w-38 grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </marquee>
      </div>
    </section>
  );
};

export default Logos;
