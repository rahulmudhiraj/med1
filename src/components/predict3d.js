import React, { useState } from 'react';

const Predict3d = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        const response = await fetch('http://127.0.0.1:5000/3dmodel', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log('Image URL:', data.output_path);
        // Send this URL to Unreal Engine
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0'
        }}>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>Upload Image for Model Prcoessing</h1>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <input
                    type="file"
                    onChange={handleImageChange}
                    style={{
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                />
                <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>
                    Upload Image
                </button>
            </form>
        </div>
    );
};

export default Predict3d;
