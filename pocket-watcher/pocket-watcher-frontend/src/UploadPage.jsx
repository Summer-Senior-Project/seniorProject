import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UploadPage() {
  const [chartUrl, setChartUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadStatus('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.csv,.xlsx,.json',
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
       try {
    setUploadStatus('Uploading...');
    const response = await axios.post(
      'http://localhost:5000/upload', 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    console.log('Response:', response.data);
    setUploadStatus('Upload successful!');
    setChartUrl(`http://localhost:5000${response.data.chart_url}`);
    navigate('/results', {
      state: {
        chartUrl: `http://localhost:5000${response.data.chart_url}`,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    setUploadStatus('Upload failed. Please try again.');
  }
};

  return (
    <div style={{ position: 'relative', width:'100vw', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width:'100%',
          height:'100%',
          objectFit:'cover',
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Glass card content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '1rem',
        }}
      >
        <div
          style={{
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: 'white',
            maxWidth: '900px',
            width: '100%',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h1 style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Upload and Transform your Financial Life!
          </h1>

          <div
            {...getRootProps()}
            style={{
              border: '2px dashed #222',
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: 'rgb(2, 2, 2)',
              marginBottom: '1rem',
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <p>Selected File: {file.name}</p>
            ) : (
              <p>Drag & drop a file here, or click to browse</p>
            )}
          </div>

          <button
            onClick={handleUpload}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'rgb(0, 0, 0)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            Upload
          </button>

          {chartUrl && (
          <img
            src={chartUrl}
            alt="Expense Chart"
            style={{ marginTop: '1rem', maxWidth: '100%', borderRadius: '12px' }}
          />
        )}

        </div>
      </div>
    </div>
  );
}
