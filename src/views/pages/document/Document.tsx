import React, { useState, useEffect } from 'react';
import FileViewer from 'react-file-viewer';

const Document = () => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch('http://localhost:8080/files/03ffe459-1daa-42fd-8580-ae447548e98c');
        const blob = await response.blob();

        // Convert the blob data to a data URL
        const dataUrl = URL.createObjectURL(blob);

        setFileData(dataUrl as any);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFileData();
  }, []);

  return (
    <div>
      {fileData && (
        <div>
          <h3>File Preview:</h3>
          <FileViewer fileType="docx" filePath={fileData} />
        </div>
      )}
    </div>
  );
};

export default Document;


const DocX = ({src})=>{
  https://docs.google.com/document/d/1KPrl5PNwi2Y7_USRRzcPaTwIj6kx6fJya6cJQ_Djl5Y
  return (
    <iframe
    className='w-full mt-[12vh]'
     // Use 'h-full' instead of 'h-100vh'
    src={src} 
    style={{ minHeight: '87vh', width: '100%', border: 0 }} // Optional: Remove iframe border
  />
  );
}
