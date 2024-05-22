import React, { useState, useCallback } from "react";
import axios from "axios";
import UploadButton from "../Components/UploadButton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

      setTimeout(() => {
        navigate("/result", { state: { taskId: task_id, fileName } });
      }, 7000);
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
      style={{ backgroundImage: 'url("Desktop - 9.svg")' }}
    >
      <motion.div
        className="text-white text-2xl md:text-5xl font-normal text-center px-4"
        style={{ fontFamily: "Inter" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        알아서 잘 딱 깔끔하고 센스있게
      </motion.div>
      <motion.div
        className="text-gray-300 text-xl md:text-2xl font-normal text-center mt-6 flex flex-col items-center px-4"
        style={{ fontFamily: "Inter" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-4 text-base">
          Input the Audio, and then wait for our recommendation!
        </div>
        <UploadButton onDrop={onDrop} />
        <a
          href="https://github.com/AJTKS"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <img src="github_logo.png" alt="GitHub" className="w-20 h-auto" />
        </a>
      </motion.div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-4 rounded shadow-lg text-center">
              <p className="mb-4">"{fileName}"을(를) 업로드 하시겠습니까?</p>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mr-2 transform transition-all duration-200 hover:bg-green-600 hover:scale-105 active:scale-95"
                onClick={handleUpload}
              >
                확인
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded transform transition-all duration-200 hover:bg-red-600 hover:scale-105 active:scale-95"
                onClick={() => setShowConfirmation(false)}
              >
                취소
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-4 rounded shadow-lg text-center">
              <p className="mb-4">{error}</p>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setError(null)}
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              className="w-auto h-40 animate-pulse"
              src="Group 1.svg"
              alt=""
            />
            <div
              className="text-center text-black text-2xl font-normal mb-4"
              style={{ fontFamily: "Inter" }}
            >
              분석 중입니다...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;
