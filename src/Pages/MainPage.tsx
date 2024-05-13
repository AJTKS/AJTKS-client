import React, { useState, useCallback } from "react";
import axios from "axios";
import UploadButton from "../Components/UploadButton";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      setIsAnalyzing(true); // Start analyzing
      try {
        const response = await axios.post(
          "https://api.example.com/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);

        setTimeout(() => {
          setIsAnalyzing(false);
          navigate("/result");
        }, 10000);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsAnalyzing(false);
      }
    },
    [navigate]
  );

  return (
    <div>
      <div className="w-full h-full bg-white"></div>
      <div>
        <img className="w-full h-auto" src="Vector.png"></img>
        <div
          className="absolute left-[342.51px] top-[458px] w-[820px] h-[107px] text-white text-[62px] font-normal break-words"
          style={{ fontFamily: "Inter" }}
        >
          알아서 잘 딱 깔끔하게 센스있게
        </div>
        <div
          className="absolute left-[457.51px] top-[583px] w-[589px] h-[38px] text-gray-300 text-[22px] font-normal break-words"
          style={{ fontFamily: "Inter" }}
        >
          Input the Audio, and then wait for our recommendation!
        </div>
        <UploadButton onDrop={onDrop} />
      </div>
      {isAnalyzing && (
        <div className="absolute w-full h-full bg-white bg-opacity-75 flex justify-center items-center">
          <div
            className="text-center text-black text-[35px] font-normal"
            style={{ fontFamily: "Inter" }}
          >
            분석 중입니다...
          </div>
          <img
            className="w-[391px] h-[351.90px]"
            src="/ajtks-client/public/1c06fef0a28189bbd6e4e04ddb5ac6a6.png"
            alt="Analysis"
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
