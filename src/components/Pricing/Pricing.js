import React from "react";

export default function Pricing() {
  return (
    <>
      <div className="xl:mx-auto xl:container py-20 2xl:px-0 px-6">
        <div className="lg:flex items-center justify-between">
          <div className=" lg:w-1/2 w-full">
            <p className="text-base leading-4 text-gray-600">
              Choose your plan
            </p>
            <h1 className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">
              My Pricing Plans for You
            </h1>
          </div>
          <div className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8">
            <img
              src="https://i.ibb.co/D9Cj264/circleback.png"
              className="absolute w-full -ml-12 mt-24"
              alt="background circle images"
            />
            <div className="bg-white cursor-pointer shadow rounded-lg p-8 relative z-30">
              <div className="md:flex items-center justify-between">
                <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                  Personal
                </h2>
                <p className="text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800">
                  $20-$50<span className="font-normal text-base">/hour</span>
                </p>
              </div>
              <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
                3 days per Week
              </p>
            </div>
            <div className="bg-white cursor-pointer shadow rounded-lg mt-3 flex relative z-30">
              <div className="w-2.5  h-auto  rounded-tl-md rounded-bl-md" />
              <div className="w-full p-8">
                <div className="md:flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                    Group
                  </h2>
                  <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                    $20-$80
                    <span className="font-normal text-base">
                      /hour/apprentice
                    </span>
                  </p>
                </div>
                <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
                  Not more than 10 apprentices in a group.
                </p>
              </div>
            </div>
            <div className="bg-white cursor-pointer shadow rounded-lg p-8 relative z-30 mt-7">
              <div className="md:flex items-center justify-between">
                <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                  Batch
                </h2>
                <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                  $15-$40
                  <span className="font-normal text-base">
                    /hour/apprentice
                  </span>
                </p>
              </div>
              <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
                More than 10 apprentices in a batch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
