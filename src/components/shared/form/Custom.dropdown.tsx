"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BsEye, BsArrowDown } from "react-icons/bs";

import IconButton from "../button";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface CustomDropdownProps {
  files: string[];
}
const CustomFileDropdown: React.FC<CustomDropdownProps> = ({ files }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (fileUrl: string) => {
    setSelectedFile(fileUrl);
    setPreviewUrl(fileUrl);
    setIsOpen(false);
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
  };

  const isPdf = (url: string) => {
    return url.endsWith(".pdf");
  };

  return (
    <div className="w-full">
      <div className="relative" ref={dropdownRef}>
        <IconButton
          title={
            selectedFile
              ? isPdf(selectedFile)
                ? `PDF File`
                : "Image Selected"
              : "Choose a file --"
          }
          handleOnClick={() => setIsOpen(!isOpen)}
          className="w-full flex-row-reverse items-center !justify-between rounded-md border bg-white px-3 py-2"
          Icon={BsArrowDown}
          iconColor="text-black"
        />

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
            <div className="py-1">
              {files.map((fileUrl, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSelect(fileUrl)}
                >
                  {isPdf(fileUrl) ? (
                    <Row className="flex items-center justify-between text-lg">
                      <p>Pdf 1 </p>
                      <Link href={fileUrl}>
                        <BsEye size={20} />
                      </Link>
                    </Row>
                  ) : (
                    <Row className="flex items-center">
                      <div className="relative mr-3 h-12 w-12">
                        <Image
                          src={fileUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="rounded object-cover"
                        />
                      </div>

                      <span>Image {index + 1}</span>
                    </Row>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="mt-4">
          <TextElement as="h1">Preview</TextElement>

          {isImage(previewUrl) ? (
            <div className="relative h-64 w-full">
              <Image
                src={previewUrl}
                alt="Selected image preview"
                fill
                className="rounded-md object-contain"
              />
            </div>
          ) : isPdf(previewUrl) ? (
            <div className="rounded-md border bg-gray-50 p-4">
              <TextElement as="p" className="mb-2">
                PDF Preview
              </TextElement>

              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <BsEye size={15} />
                Open PDF Preview
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CustomFileDropdown;
