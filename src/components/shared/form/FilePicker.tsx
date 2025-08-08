import Image from "next/image";
import { useState } from "react";

interface FilePickerProps {
  fieldId: string;
  onFileChange: (fieldId: string, files: File[]) => void;
  onFileRemove: (fieldId: string) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
  initialFiles?: TFormFileData[];
  onRemoveRemoteFile?: (fieldId: string, file: TFormFileData) => void;
}

const FilePicker = ({
  fieldId,
  onFileChange,
  onFileRemove,
  maxFiles = 2,
  accept = "image/*,.pdf,.doc,.docx",
  className = "",
  initialFiles,
  onRemoveRemoteFile,
}: FilePickerProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [remoteFiles, setRemoteFiles] = useState<TFormFileData[]>(
    initialFiles || []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    // Check if adding new files would exceed the limit
    if (files.length + newFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    // Process each new file
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFileChange(fieldId, updatedFiles);
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    onFileRemove(fieldId);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    }
    if (file.type === "application/pdf") {
      return (
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    );
  };

  // Reusable remove button
  const RemoveButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-4">
        {remoteFiles.map((file, index) => (
          <div
            key={file.s3Key || file.signedUrl || index}
            className="relative flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-2"
          >
            {file.mimeType?.startsWith("image/") ? (
              <Image
                src={file.signedUrl}
                alt={file.fileName}
                width={64}
                height={64}
                className="h-16 w-16 rounded object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                {/* You can add a file icon here */}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {file.fileName}
              </span>
              <span className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <RemoveButton
              onClick={() => {
                setRemoteFiles((prev) => prev.filter((_, i) => i !== index));
                onRemoveRemoteFile?.(fieldId, remoteFiles[index]);
              }}
            />
          </div>
        ))}

        {files.map((file, index) => (
          <div
            key={index}
            className="relative flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-2"
          >
            {file.type.startsWith("image/") ? (
              <Image
                src={previews[index]}
                alt={`Preview ${index + 1}`}
                width={64}
                height={64}
                className="h-16 w-16 rounded object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                {getFileIcon(file)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <RemoveButton onClick={() => handleFileRemove(index)} />
          </div>
        ))}
      </div>

      {files.length + remoteFiles.length < maxFiles && (
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-400 px-4 py-2 hover:bg-gray-50">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple
          />
          <span className="text-sm text-gray-600">Choose File</span>
          <span className="text-xs text-gray-500">(Max {maxFiles} files)</span>
        </label>
      )}
    </div>
  );
};

export default FilePicker;
