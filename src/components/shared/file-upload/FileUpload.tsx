import React, { useRef } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import IconButton from '../button';
import Row from '../row';
import TextElement from '../typography/TextElement.typo';

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
  acceptedFileTypes = 'JPEG, PNG, PDF, Text, Excel, Word',
  maxFileSizeMB = 40,
  containerClassName = 'w-[20%]',
  heading = 'Drag & Drop files or',
  description,
  maxFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      const newFiles = selectedFiles.filter(file => {
        const fileSizeMB = file.size / (1024 * 1024);
        const isValidSize = fileSizeMB <= maxFileSizeMB;
        const isDuplicate = uploadedFiles.some(
          existing => existing.name === file.name,
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
      fileInputRef.current.value = '';
    }
  };

  return (
    <Row
      className={`bg-orange-100 py-8 px-4 rounded-lg border border-dashed border-green-400 flex-col gap-2 justify-center items-center ${containerClassName}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <IoMdCloudUpload
        className="text-green-600 size-32 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      />

      <Row className="items-center gap-2">
        <TextElement as="h3">{heading}</TextElement>

        <TextElement
          as="h3"
          className="text-green-600 underline cursor-pointer"
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
          className="text-start w-full mt-2"
        >{`Uploaded ${uploadedFiles.length}${maxFiles ? `/${maxFiles}` : ''} file${uploadedFiles.length > 1 ? 's' : ''}`}</TextElement>
      )}

      {uploadedFiles.map((file, index) => (
        <Row
          key={index}
          className="items-center justify-between p-1 rounded-md bg-white w-full border border-indigo-300"
        >
          <TextElement as="p" className="line-clamp-1">
            {file.name}
          </TextElement>

          <div className="bg-slate-100 rounded-full flex justify-center items-center size-6">
            <MdDelete
              className="text-red-500 size-4 cursor-pointer"
              onClick={() => onDeleteClick?.(file.name)}
            />
          </div>
        </Row>
      ))}

      {uploadedFiles?.length > 0 && (
        <IconButton
          title="Upload Documents"
          className="bg-orange-400 py-1 w-full"
          btnClassName="text-center w-full"
          handleOnClick={onUploadClick}
        />
      )}
    </Row>
  );
};

export default FileUpload;
