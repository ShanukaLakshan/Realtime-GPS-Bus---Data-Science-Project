import CSVReader from "react-csv-reader";

interface CSVUploaderProps {
  onFileLoaded: (data: Array<Array<string>>) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onFileLoaded }) => {
  return (
    <CSVReader
      onFileLoaded={onFileLoaded}
      inputId="ObiWan"
      inputStyle={{ color: "blue" }}
    />
  );
};

export default CSVUploader;
