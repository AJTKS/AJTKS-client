import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const { task_id } = useParams<{ task_id: string }>();
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(
          `https://ajtksbackend.p-e.kr/task/${task_id}`
        );
        const { status, searchResult } = response.data;

        if (status === "completed") {
          setSearchResult(searchResult);
        } else {
          setTimeout(fetchResult, 3000);
        }
      } catch (error) {
        console.error("Error fetching task status:", error);
        setError("결과를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchResult();
  }, [task_id]);

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

  if (!searchResult) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <img className="w-40 h-40 animate-pulse" src="Group 1.png" alt="" />
        <div
          className="text-center text-black text-2xl font-normal mb-4"
          style={{ fontFamily: "Inter" }}
        >
          분석 중입니다...
        </div>
      </div>
    );
  }

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
        {searchResult.map((result: any, index: number) => (
          <div
            key={index}
            className="relative w-[172px] h-[228px] rounded-tl-[38px] overflow-hidden bg-white bg-opacity-60 shadow-md border border-white backdrop-blur-md"
          >
            <div className="w-full h-[172px] bg-gray-300">
              <img
                className="w-full h-full"
                src={result.image}
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
              src={searchResult[0]?.featuredImage}
              alt="Featured music"
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div className="bg-black bg-opacity-80 text-blue-400 text-sm font-bold px-4 py-2 rounded-full">
            음악 설명 by MU-LLaMA
          </div>
          <div
            className="bg-blue-800 text-white text-base font-bold px-4 py-2 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            다시 인식하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
