import React from "react";

interface CSVUploaderProps {
  onFileLoaded: (data: Array<Array<string>>) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onFileLoaded }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvData = reader.result as string;
        const rows = csvData.split("\n").map((row) => row.split(","));
        onFileLoaded(rows);
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default CSVUploader;
