"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button">
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      className="bg-slate-50 dark:bg-slate-800 p-4 h-56 flex flex-col items-center justify-center ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 ut-uploading:animate-pulse ut-button:!bg-indigo-600 ut-button:p-5 ut-button:!rounded-lg ut-button:cursor-pointer ut-button:hover:!bg-indigo-700 ut-button:!text-white"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      config={{ cn: twMerge }}
    />
  );
}
export default ImageUpload;
