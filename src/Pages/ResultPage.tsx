import React from "react";

const ResultPage = () => {
  return (
    <div className="relative w-full h-full bg-white">
      <div className="absolute w-[1440px] h-[1024px] bg-black"></div>
      <div className="absolute left-[-32.51px] top-0 w-[1520.91px] h-[1408.54px]">
        <div className="absolute left-[32.51px] w-full h-full bg-white"></div>
        <div className="absolute top-[312.43px] w-full h-[1096.11px] bg-gradient-to-l from-purple-800 to-cyan-500"></div>
      </div>
      <div
        className="absolute left-[660px] top-[656px] text-white text-[20px] font-bold"
        style={{ fontFamily: "Inter" }}
      >
        추천 음악 목록
      </div>
      <div className="absolute left-[250.25px] top-[714px] flex items-start justify-start space-x-[20.11px]">
        {/* Cards Repeated with Different Contents */}
        {Array.from({ length: 4 }).map((_, index) => (
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
          </div>
        ))}
      </div>
      <div className="absolute left-[250px] top-[63px] w-[1061.44px] h-[467px]">
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
        <div className="absolute left-0 top-[334px] w-[174.44px] h-[35px] pl-[20.72px] pr-[20.72px] pt-[10px] pb-[10px] bg-black bg-opacity-80 rounded-full border border-black flex justify-center items-center space-x-[6.68px]">
          <div className="text-center text-blue-400 text-[12px] font-bold">
            음악 설명 by MU-LLaMA
          </div>
        </div>
        <div className="absolute right-0 top-0 w-[128.44px] h-[38px] px-[20.72px] py-[10px] bg-blue-800 rounded-full flex justify-center items-center">
          <div className="text-white text-[15px] font-bold">다시 인식하기</div>
        </div>
      </div>
      <div className="absolute left-[130px] top-[620px] w-[1181.01px] border-t border-white border-opacity-40"></div>
    </div>
  );
};

export default ResultPage;
