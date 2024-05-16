import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { searchResult } = location.state || {};

  return (
    <div className="overflow-hidden w-full min-h-screen fixed inset-0">
      <img
        className="absolute w-full min-h-screen object-cover"
        src="Desktop - 9.png"
        alt="Background"
      />
      <div
        className="absolute left-[660px] top-[550px] text-white text-[20px] font-bold"
        style={{ fontFamily: "Inter" }}
      >
        추천 음악 목록
      </div>
      <div className="absolute left-[250.25px] top-[600px] flex items-start justify-start space-x-[20.11px]">
        {searchResult &&
          searchResult.map((result: any, index: number) => (
            <div
              key={index}
              className="relative w-[172px] h-[228px] rounded-tl-[38px] overflow-hidden"
            >
              <div
                className="absolute top-0 left-[0.25px] w-full h-full bg-white bg-opacity-60 shadow-[0_0_12.6px_rgba(0,0,0,0.10)] border border-white"
                style={{ backdropFilter: "blur(36.94px)" }}
              ></div>
              <div className="absolute top-0 left-[0.36px] w-[172px] h-[172px]">
                <div className="absolute w-full h-full bg-gray-300"></div>
                <img
                  className="w-full h-full"
                  src=""
                  alt={`Card Image ${index + 1}`}
                />
              </div>
              <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center p-2">
                <div className="text-sm">{result.musicName}</div>
                <div className="text-xs">{result.singer}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute left-[250px] top-[63px] w-[1061.44px] h-[430px]">
        <div className="absolute top-[58px] w-[250px] h-[250px] bg-gray-300">
          <img className="w-full h-full" src="" alt="Featured Image" />
        </div>
        <div className="absolute left-[270px] top-[126px] flex flex-col items-start space-y-6">
          <div className="text-center text-black text-[30px] font-bold">
            NewJeans
          </div>
          <div className="text-black text-[16px] leading-[25.6px]">
            작사 Gigi, Erika de Casier, Fine Glindvad Jensen, 해린(HAERIN)
            <br />
            작곡 FRNK, Frankie Scoca, Erika de Casier, Fine Glindvad Jensen
            <br />
            편곡 FRNK, Frankie Scoca
          </div>
        </div>
        <div className="absolute left-0 top-[334px] w-auto h-[35px] pl-[20.72px] pr-[20.72px] pt-[10px] pb-[10px] bg-black bg-opacity-80 rounded-full border border-black flex justify-center items-center space-x-[6.68px]">
          <div className="text-center text-blue-400 text-[12px] font-bold">
            음악 설명 by MU-LLaMA
          </div>
        </div>
        <div className="absolute right-0 top-0 w-auto h-[38px] px-[20.72px] py-[10px] bg-blue-800 rounded-full flex justify-center items-center">
          <div className="text-white text-[15px] font-bold">다시 인식하기</div>
        </div>
      </div>
      <div className="absolute left-[130px] top-[530px] w-[1181.01px] border-t border-white border-opacity-40"></div>
    </div>
  );
};

export default ResultPage;
