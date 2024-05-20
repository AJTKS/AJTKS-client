import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

const decodeUnicode = (str: string) => {
  return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
};

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const checkOverflow = (element: HTMLElement | null) => {
    if (element) {
      return element.scrollWidth > element.clientWidth;
    }
    return false;
  };

  useEffect(() => {
    if (!taskId) {
      setError("Task ID가 제공되지 않았습니다.");
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await axios.get(
          `https://ajtksbackend.p-e.kr/task/${taskId}`
        );
        const data = response.data;

        if (!data || !data.searchResult) {
          setError("결과 데이터가 없습니다.");
          return;
        }

        const decodedResult = data.searchResult.map((result: any) => ({
          ...result,
          musicName: decodeUnicode(result.musicName),
          singer: decodeUnicode(result.singer),
          albumArt: result.albumArt
            ? `https://ajtksbackend.p-e.kr/${result.albumArt}`
            : null,
        }));

        setSearchResult(decodedResult);
      } catch (error) {
        console.error("Error fetching task status:", error);
        setError("결과를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchResult();
  }, [taskId]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p className="mb-4">{error}</p>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("Desktop - 9.svg")' }}
    >
      <div className="relative w-full max-w-4xl px-4 text-center mt-10">
        <div className="relative z-10 text-white text-3xl md:text-4xl font-bold">
          추천 음악 목록
        </div>
        <button
          className="absolute right-0 top-0 transform -translate-y-1/2 bg-blue-800 text-white text-base font-bold px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 active:scale-95"
          style={{ right: "2rem" }}
          onClick={() => navigate("/")}
        >
          다시 인식하기
        </button>
      </div>
      <div
        className={`relative z-10 mt-4 ${
          isMobile
            ? "flex overflow-x-auto space-x-4 px-4"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4"
        }`}
      >
        {searchResult.map((result, index) => {
          const nameRef = useRef<HTMLDivElement>(null);
          const singerRef = useRef<HTMLDivElement>(null);
          const [nameOverflow, setNameOverflow] = useState(false);
          const [singerOverflow, setSingerOverflow] = useState(false);

          useLayoutEffect(() => {
            setNameOverflow(checkOverflow(nameRef.current));
            setSingerOverflow(checkOverflow(singerRef.current));
          }, []);

          return (
            <div
              key={index}
              className="relative w-[220px] h-[320px] rounded-tl-[38px] overflow-hidden bg-white bg-opacity-60 shadow-md border border-white backdrop-blur-md flex-shrink-0"
            >
              <div className="w-full h-[200px] bg-gray-300">
                {result.albumArt ? (
                  <img
                    className="w-full h-full object-cover"
                    src={result.albumArt}
                    alt={`Album art for ${result.musicName}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-2 flex flex-col justify-between h-[120px]">
                <div
                  ref={nameRef}
                  className={`relative ${
                    nameOverflow ? "flex overflow-x-hidden" : ""
                  }`}
                >
                  <div
                    className={`${
                      nameOverflow
                        ? "animate-marquee whitespace-nowrap"
                        : "truncate"
                    }`}
                  >
                    <span className="text-black text-lg font-bold mx-4">
                      {result.musicName}
                    </span>
                  </div>
                </div>
                <div
                  ref={singerRef}
                  className={`relative ${
                    singerOverflow ? "flex overflow-x-hidden" : ""
                  }`}
                >
                  <div
                    className={`${
                      singerOverflow
                        ? "animate-marquee whitespace-nowrap"
                        : "truncate"
                    }`}
                  >
                    <span className="text-gray-700 text-sm mx-4">
                      {result.singer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative z-10 mt-10 w-full max-w-4xl px-4">
        <div className="flex justify-between w-full mt-4">
          <div className="bg-black bg-opacity-80 text-blue-400 text-sm font-bold px-4 py-2 rounded-full">
            음악 설명 by MU-LLaMA
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
