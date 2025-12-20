import React from "react";
import chart from "../../../assets/data-saving-2.png";
import phone from "../../../assets/data-saving-3.png";
import infographic from "../../../assets/data-saving.png";
import arrow from "../../../assets/arrowgrayright.png";
import img4 from "../../../assets/data-saving-6.png";
import imginfo from "../../../assets/data-saving-4.png";

const DataSaving = () => {
  return (
    <section id="pages" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        <div className="rounded-2xl bg-white p-6 ">

          <img src={infographic} alt="" className="w-full mb-4" />

          <img src={imginfo} className="w-full mb-4" alt="" />
        </div>

        <div className="py-10 bg-white ">
          <img src={chart} alt="" className="w-full mb-10" />

          <h4 className="text-base font-semibold text-[#1B2937]">
            AI-Powered Conversations
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            Deliver human-like, intelligent responses using advanced natural
            language processing. Engage users 24/7 with personalized support.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[#1B2937]">
            Real-Time Analytics
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            Track performance, user interactions, and engagement insights to
            continuously improve your chatbot strategy.
          </p>

          <div className="flex space-y-3">
            <div className="flex pt-4 items-center gap-1">
              <img src={arrow} className="h-4 w-4" />
              <span className="text-sm text-gray-700 mr-2">
                Easy Drag-and-Drop Builder
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img src={arrow} className="h-4 w-4" />
              <span className="text-sm text-gray-700">
                Multi-Channel Support
              </span>
            </div>
          </div>

        </div>

        <div className="rounded-2xl bg-white p-9 ">
          <img src={phone} alt="" className="w-[250px] h-[280px] object-cover mb-4" />

         <img src={img4} alt="" />
        </div>

      </div>
    </section>
  );
};

export default DataSaving;
