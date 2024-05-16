import React from "react";
import { useDropzone } from "react-dropzone";

interface UploadButtonProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="relative w-[200px] h-[60px] bg-green-500 flex justify-center items-center">
      <div
        {...getRootProps()}
        className="flex justify-center items-center w-full h-full text-white text-lg font-normal cursor-pointer"
        style={{ fontFamily: "Inter" }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here...</p> : <p>Select the Audio</p>}
      </div>
    </div>
  );
};

export default UploadButton;
