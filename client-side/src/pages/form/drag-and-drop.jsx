import { useState } from "react";

const DragDropFiles = ({ selectedFile, setSelectedFile }) => {
  const [isDrag, setIsDrag] = useState(false);

  const handleDragOver = (event) => {
    setIsDrag(true);
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  return (
    <>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDrag(false)}
        onDrop={handleDrop}
      >
        <div
          className="text-center drag-drop-container"
          style={{
            backgroundColor: isDrag ? "#b8d4d4" : "#ffffff",
          }}
        >
          <img
            src="http://localhost:3000/assets/images/upload-icon.png"
            alt="Drag and Drop File"
            width="200px"
          />
          <div>Drag and drop file here </div>
          <div className="">
            Selected File:{" "}
            <span className="text-warning">
              {selectedFile ? selectedFile.name : "None"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DragDropFiles;
