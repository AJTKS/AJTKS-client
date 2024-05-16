import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { searchResult } = location.state || {};

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("Desktop - 9.png")' }}
    >
      <div
        className="text-white text-2xl font-bold mb-8"
        style={{ fontFamily: "Inter" }}
      >
        추천 음악 목록
      </div>
      <div className="flex flex-wrap justify-center items-start space-x-5">
        {searchResult &&
          searchResult.map((result: any, index: number) => (
            <div
              key={index}
              className="relative w-44 h-56 rounded-tl-xl overflow-hidden m-2"
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 shadow-md border border-white"
                style={{ backdropFilter: "blur(10px)" }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-44 bg-gray-300">
                <img
                  className="w-full h-full object-cover"
                  src=""
                  alt={`${result.musicName} 앨범 커버`}
                />
              </div>
              <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center p-2">
                <div className="text-sm">{result.musicName}</div>
                <div className="text-xs">{result.singer}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="relative w-full max-w-4xl flex flex-col items-start mt-8">
        <div className="w-64 h-64 bg-gray-300 mb-4">
          <img
            className="w-full h-full object-cover"
            src=""
            alt="Featured Image"
          />
        </div>
        <div className="flex flex-col items-start space-y-4">
          <div className="text-black text-2xl font-bold">NewJeans</div>
          <div className="text-black text-lg leading-snug">
            작사 Gigi, Erika de Casier, Fine Glindvad Jensen, 해린(HAERIN)
            <br />
            작곡 FRNK, Frankie Scoca, Erika de Casier, Fine Glindvad Jensen
            <br />
            편곡 FRNK, Frankie Scoca
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
