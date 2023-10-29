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
      {/* Always read this csv file /mnt/AAF02A9CF02A6EAF/Sem5/Aca/Data Science and Engineering Project/Realtime-GPS-Bus---Data-Science-Project/src/datasets/trip_data_1_new.csv */}

      {/* <input type="file" onChange={handleFileChange} /> */}

      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CSVUploader;
