import React, { useState } from 'react';
import axios from 'axios';
import ThreeDView from './ThreeDView';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [maskFile, setMaskFile] = useState(null);
  const [imageSlices, setImageSlices] = useState([]);
  const [maskSlices, setMaskSlices] = useState([]);
  const [show3DView, setShow3DView] = useState(false);
  const [volumeData, setVolumeData] = useState(null); // State for 3D data
  const [videoUrl, setVideoUrl] = useState(null)
  const BACKEND_URL = "http://127.0.0.1:5000";

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleMaskChange = (e) => {
    setMaskFile(e.target.files[0]);
  };

  const handle3DView = async () => {
    // Fetch the 3D video data from the backend
    try {
      const response = await axios.get(`${BACKEND_URL}/3d_view`);
      console.log("Received data", response.data.videoUrl);
      setVideoUrl(response.data.videoUrl); // Save the video URL
      setShow3DView(true);
    } catch (error) {
      console.error('Error fetching 3D view:', error);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !maskFile) {
      alert('Please upload both image and mask files.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('mask', maskFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setImageSlices(response.data.image_slices);
      setMaskSlices(response.data.mask_slices);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: '#333',
        marginBottom: '20px',
        fontSize: '2rem',
        fontWeight: 'bold',
      }}>Upload NIfTI Files for Processing</h1>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Upload NIfTI Image:</label>
        <input type="file" accept=".nii,.nii.gz" onChange={handleImageChange} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Upload NIfTI Mask:</label>
        <input type="file" accept=".nii,.nii.gz" onChange={handleMaskChange} />
      </div>

      <button onClick={handleUpload} style={{
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '16px'
      }}>
        Upload and Process
      </button>

      <div style={{ marginBottom: '20px' }}>
        {imageSlices.length > 0 && maskSlices.length > 0 && <h2 style={{
          color: '#333',
          marginBottom: '10px'
        }}>Processed Slices:</h2>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {imageSlices.map((imgslice, index) => (
            <div style={{
              display: 'flex',
              marginBottom: '10px',
              justifyContent: 'center',
              alignItems: 'center'
            }} key={index}>
              <div>
                <img src={imgslice} alt={`Slice ${index}`} style={{
                  margin: '10px',
                  height: '200px',
                  width: '200px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }} />
              </div>
              <div>
                <img src={maskSlices[index]} alt={`Slice ${index}`} style={{
                  margin: '10px',
                  height: '200px',
                  width: '200px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handle3DView} style={{
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px'
      }}>
        Show 3D View
      </button>

      {/* Conditionally show the 3D view */}
      {show3DView && videoUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>3D Visualization:</h2>
          <video width="600"  autoPlay>
            <source src={"http://localhost:5000/combined.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
