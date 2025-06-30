import React from "react";
import ProfilePlaceholder from "../assets/profile_img_placeholder.svg";

const AboutUs = () => {
  return (
    <div className="flex justify-center min-h-[calc(100vh-50px)] ">
      <div className="h-full w-3/4 py-4 flex flex-col gap-2 items-center">
        <div className="text-2xl font-semibold mt-20">Our Team</div>
        <div className="flex gap-8 mt-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={ProfilePlaceholder}
              alt="Profile iMg"
              className="h-[100px] w-[100px] sm:h-[160px] sm:w-[160px] rounded-full shadow-md"
            />
            <div className="flex flex-col justify-center items-center">
              <span>Developed By:</span>
              <span className="font-semibold">Jagannath Nayak</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={ProfilePlaceholder}
              alt="Profile iMg"
              className="h-[100px] w-[100px] sm:h-[160px] sm:w-[160px] rounded-full shadow-md"
            />
            <div className="flex flex-col justify-center items-center">
              <span> Guided By:</span>
              <span className="font-semibold">Nithya Saminathan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
