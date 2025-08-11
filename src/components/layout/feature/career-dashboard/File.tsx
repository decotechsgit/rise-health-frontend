import { useState } from "react";

import FileUpload from "@/components/shared/file-upload/FileUpload";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

const File = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = () => {
    if (files.length < 1) {
      console.log("Please select file first");

      return;
    }
    console.log("Upload triggered");
    setFiles([]);
  };

  return (
    <Row className="w-full flex-col items-start rounded-3xl bg-white p-6">
      <TextElement as="h3">Upload Data Audit</TextElement>

      <TextElement as="p">
        Submit necessary documents and record for audit purposes. Ensure files
        are accurate, relevant, and in an accepted format.
      </TextElement>

      <FileUpload
        uploadedFiles={files}
        onFileSelect={(selectedFiles) => {
          setFiles((prev) => [...prev, ...selectedFiles]);
        }}
        onDeleteClick={(fileName) =>
          setFiles((prev) => prev.filter((file) => file.name !== fileName))
        }
        onUploadClick={handleFileUpload}
        onError={(msg) => console.error(msg)}
      />
    </Row>
  );
};
export default File;
