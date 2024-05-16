import React from "react";

const ResultPage = () => {
  return (
    <div className="overflow-hidden w-full min-h-screen fixed inset-0 flex flex-col items-center justify-center">
      <img
        className="absolute w-full min-h-screen object-cover"
        src="Desktop - 9.png"
        alt="Background"
      />
      <div className="relative z-10 text-white text-[20px] font-bold mt-10">
        추천 음악 목록
      </div>
      <div className="relative z-10 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {/* Cards Repeated with Different Contents */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative w-[172px] h-[228px] rounded-tl-[38px] overflow-hidden bg-white bg-opacity-60 shadow-md border border-white backdrop-blur-md"
          >
            <div className="w-full h-[172px] bg-gray-300">
              <img
                className="w-full h-full"
                src={`path-to-image-${index + 1}.jpg`}
                alt={`Music recommendation ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-10 w-full max-w-4xl px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-300 p-6 rounded-lg shadow-md">
          <div className="w-full sm:w-1/3 bg-gray-300">
            <img
              className="w-full h-full"
              src="path-to-featured-image.jpg"
              alt="Featured music"
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div className="bg-black bg-opacity-80 text-blue-400 text-sm font-bold px-4 py-2 rounded-full">
            음악 설명 by MU-LLaMA
          </div>
          <div className="bg-blue-800 text-white text-base font-bold px-4 py-2 rounded-full">
            다시 인식하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
