import { Client, Storage, ID } from "appwrite";
import React, { useEffect, useRef, useState } from "react";

const EndPoint = process.env.NEXT_PUBLIC_ENDPOINT ?? "";
const Project = process.env.NEXT_PUBLIC_PROJECT ?? "";
const BucketId = process.env.NEXT_PUBLIC_BUCKETID ?? "";

const client = new Client();
client.setEndpoint(EndPoint).setProject(Project);

const storage = new Storage(client);

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
    sendMessageToWS: (message: string) => void; 

}




export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, sendMessageToWS }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  useEffect(() => {
    setDownloadUrl(downloadUrl)
  }, [downloadUrl]);
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onFileSelect(file);

    try {
      const response = await storage.createFile(BucketId, ID.unique(), file);
      console.log("Upload success:", response);

     const downloadUrl = storage.getFileDownload(
        response.bucketId,
        response.$id
      );
          sendMessageToWS(downloadUrl);
      console.log("Download URL:", downloadUrl);

      alert(`File "${response.name}" uploaded successfully!`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
       File
      </button>

      <input
        id="input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

