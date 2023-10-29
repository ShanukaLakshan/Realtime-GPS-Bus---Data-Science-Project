import React, { Component, ChangeEvent } from "react";

interface State {
  data: any[]; // Replace 'any' with the actual data type of your JSON data
  selectedFile: File | null;
  totalFileSize: number;
  totalDataRows: number;
  uploading: boolean;
}

class FileUploadComponent extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [], // Initialize as an empty array
      selectedFile: null,
      totalFileSize: 0,
      totalDataRows: 0,
      uploading: false,
    };
  }

  // Function to handle file input change
  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const selectedFile = files[0];
      this.setState({ selectedFile, uploading: false });

      // Calculate the file size
      const fileSize = selectedFile.size;
      this.setState({ totalFileSize: fileSize });

      // Read and parse the JSON file to calculate the number of data rows
      this.readAndParseJSON(selectedFile).then((jsonData: any[]) => {
        const numRows = jsonData.length;
        this.setState({ totalDataRows: numRows, data: jsonData });
      });
    }
  };

  // Function to read and parse the JSON file
  readAndParseJSON = async (file: File) => {
    return new Promise<any[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  sendDataToServer = async () => {
    const { data } = this.state;

    if (data.length === 0) {
      console.error("No data to upload.");
      return;
    }

    const apiUrl = "http://localhost:5000/save-bus-data";

    this.setState({ uploading: true }); // Start uploading

    try {
      // Simulate a 2-second delay for each batch
      const batchSize = 200;
      const delay = 2000; // 2 seconds
      for (let i = 0; i < data.length; i += batchSize) {
        const batchData = data.slice(i, i + batchSize);

        setTimeout(async () => {
          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(batchData),
            });

            if (response.ok) {
              console.log(`Batch ${i / batchSize + 1} sent successfully.`);
            } else {
              console.error(`Error sending batch ${i / batchSize + 1}`);
            }
          } catch (error) {
            console.error("Error sending data:", error);
          }
        }, (i / batchSize) * delay);
      }
    } catch (error) {
      console.error("Error reading and parsing the JSON file:", error);
    }
  };

  render() {
    const { totalFileSize, totalDataRows, uploading } = this.state;
    return (
      <div>
        <input type="file" accept=".json" onChange={this.handleFileChange} />
        <p>Total File Size: {totalFileSize} bytes</p>
        <p>Total Data Rows: {totalDataRows}</p>
        <button onClick={this.sendDataToServer} disabled={uploading}>
          Upload Data
        </button>
        {uploading && <p>Uploading data... Please wait.</p>}
      </div>
    );
  }
}

export default FileUploadComponent;
