import React, { useState, useCallback } from "react";
import axios from "axios";
import UploadButton from "../Components/UploadButton";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        "https://ajtksbackend.p-e.kr/upload",
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
            `https://ajtksbackend.p-e.kr/task/${task_id}`
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

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          if (error.response.data.error === "No file part") {
            setError("파일이 전송되지 않았습니다.");
          } else if (error.response.data.error === "No selected file") {
            setError("선택된 파일이 없습니다.");
          } else if (error.response.data.error === "File type not allowed") {
            setError("허용되지 않는 파일 타입입니다. 가능한 타입: mp3, wav");
          }
        }
      } else {
        setError("파일 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("Desktop - 9.png")' }}
    >
      <div
        className="text-white text-5xl font-normal"
        style={{ fontFamily: "Inter" }}
      >
        알아서 잘 딱 깔끔하게 센스있게
      </div>
      <div
        className="text-gray-300 text-2xl font-normal text-center mt-6 flex flex-col items-center"
        style={{ fontFamily: "Inter" }}
      >
        <div className="mb-4">
          Input the Audio, and then wait for our recommendation!
        </div>
        <UploadButton onDrop={onDrop} />
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="mb-4">{error}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setError(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex flex-col justify-center items-center">
          <img className="w-40 h-40 animate-pulse" src="Group 1.png" alt="" />
          <div
            className="text-center text-black text-2xl font-normal mb-4"
            style={{ fontFamily: "Inter" }}
          >
            분석 중입니다...
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
