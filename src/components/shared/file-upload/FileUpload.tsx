import React, { useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import IconButton from "../button";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface FileUploadProps {
  uploadedFiles: File[];
  onFileSelect: (files: File[]) => void;
  onDeleteClick?: (fileName: string) => void;
  onUploadClick?: () => void;
  onError?: (message: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  containerClassName?: string;
  heading?: string;
  description?: string;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  uploadedFiles,
  onFileSelect,
  onDeleteClick,
  onUploadClick,
  onError,
  acceptedFileTypes = "JPEG, PNG, PDF, Text, Excel, Word",
  maxFileSizeMB = 40,
  containerClassName = "w-[20%]",
  heading = "Drag & Drop files or",
  description,
  maxFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      const newFiles = selectedFiles.filter((file) => {
        const fileSizeMB = file.size / (1024 * 1024);
        const isValidSize = fileSizeMB <= maxFileSizeMB;
        const isDuplicate = uploadedFiles.some(
          (existing) => existing.name === file.name
        );

        if (!isValidSize && onError) {
          onError(`"${file.name}" exceeds the ${maxFileSizeMB}MB limit.`);
        }

        if (isDuplicate && onError) {
          onError(`Duplicate file "${file.name}" not allowed.`);
        }

        return isValidSize && !isDuplicate;
      });

      if (newFiles.length > 0) {
        onFileSelect(newFiles);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Row
      className={`flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 bg-orange-100 px-4 py-8 ${containerClassName}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <IoMdCloudUpload
        className="size-32 cursor-pointer text-green-600"
        onClick={() => fileInputRef.current?.click()}
      />

      <Row className="items-center gap-2">
        <TextElement as="h3">{heading}</TextElement>

        <TextElement
          as="h3"
          className="cursor-pointer text-green-600 underline"
          onClick={() => fileInputRef.current?.click()}
        >
          Browse
        </TextElement>
      </Row>

      <TextElement as="p">
        {description ||
          `Files must be ${acceptedFileTypes} and up to ${maxFileSizeMB}MB`}
      </TextElement>

      {uploadedFiles.length > 0 && (
        <TextElement
          as="p"
          className="mt-2 w-full text-start"
        >{`Uploaded ${uploadedFiles.length}${maxFiles ? `/${maxFiles}` : ""} file${uploadedFiles.length > 1 ? "s" : ""}`}</TextElement>
      )}

      {uploadedFiles.map((file, index) => (
        <Row
          key={index}
          className="w-full items-center justify-between rounded-md border border-indigo-300 bg-white p-1"
        >
          <TextElement as="p" className="line-clamp-1">
            {file.name}
          </TextElement>

          <div className="flex size-6 items-center justify-center rounded-full bg-slate-100">
            <MdDelete
              className="size-4 cursor-pointer text-red-500"
              onClick={() => onDeleteClick?.(file.name)}
            />
          </div>
        </Row>
      ))}

      {uploadedFiles?.length > 0 && (
        <IconButton
          title="Upload Documents"
          className="w-full bg-orange-400 py-1"
          btnClassName="text-center w-full"
          handleOnClick={onUploadClick}
        />
      )}
    </Row>
  );
};

export default FileUpload;
