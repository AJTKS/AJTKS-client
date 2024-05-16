import React, { useState, useCallback } from "react";
import axios from "axios";
import UploadButton from "../Components/UploadButton";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFileName(selectedFile.name);
    setFile(selectedFile);
    setShowConfirmation(true);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsAnalyzing(true);
    setShowConfirmation(false);

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

      const { task_id } = response.data;
      console.log("File uploaded successfully, task ID:", task_id);

      const checkTaskStatus = async () => {
        try {
          const statusResponse = await axios.get(
            `https://api.example.com/task/${task_id}`
          );
          const { status, searchResult } = statusResponse.data;

          if (status === "completed") {
            navigate("/result", { state: { searchResult } });
            setIsAnalyzing(false);
          } else {
            setTimeout(checkTaskStatus, 3000);
          }
        } catch (error) {
          console.error("Error checking task status:", error);
          setIsAnalyzing(false);
        }
      };

      checkTaskStatus();
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="overflow-hidden w-full min-h-screen fixed inset-0">
      <img
        className="absolute w-full min-h-screen object-cover"
        src="Desktop - 9.png"
        alt="Background"
      />
      <div className="absolute left-[342.51px] top-[458px] w-[820px] h-[107px] flex justify-center items-center">
        <div
          className="text-white text-[62px] font-normal break-words"
          style={{ fontFamily: "Inter" }}
        >
          알아서 잘 딱 깔끔하게 센스있게
        </div>
      </div>
      <div className="absolute left-[457.51px] top-[583px] w-[589px] flex flex-col justify-center items-center text-gray-300 text-[22px] font-normal break-words">
        Input the Audio, and then wait for our recommendation!
        <br />
        <UploadButton onDrop={onDrop} />
      </div>

      {showConfirmation && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="mb-4">"{fileName}"을(를) 업로드 하시겠습니까?</p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleUpload}
            >
              확인
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setShowConfirmation(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          <div
            className="text-center text-black text-[35px] font-normal"
            style={{ fontFamily: "Inter" }}
          >
            분석 중입니다...
          </div>
          <img
            className="w-[391px] h-[351.90px]"
            src="1c06fef0a28189bbd6e4e04ddb5ac6a6.png"
            alt="Analysis"
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
