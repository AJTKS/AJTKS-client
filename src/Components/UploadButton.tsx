import React from "react";
import { useDropzone } from "react-dropzone";

interface UploadButtonProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="relative w-52 h-16">
      <div
        {...getRootProps()}
        className={`flex justify-center items-center w-full h-full text-white text-lg font-normal cursor-pointer rounded-lg transition duration-200 ease-in-out ${
          isDragActive ? "bg-green-400" : "bg-green-500"
        } hover:bg-green-600 active:bg-green-700 active:scale-95`}
        style={{ fontFamily: "Inter" }}
      >
        <input {...getInputProps()} />
        <p onClick={open}>
          {isDragActive ? "Drop the files here..." : "Select the Audio"}
        </p>
      </div>
    </div>
  );
};

export default UploadButton;
