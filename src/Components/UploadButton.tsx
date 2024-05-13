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
    <div className="w-full h-full bg-green-500 flex justify-center items-center">
      <div
        {...getRootProps()}
        className="absolute top-[32px] left-[41px] w-[218px] h-[30.81px] flex justify-center items-center text-white text-[18px] font-normal cursor-pointer"
        style={{ fontFamily: "Inter" }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here...</p> : <p>Select the Audio</p>}
      </div>
    </div>
  );
};

export default UploadButton;
