import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImgUpload from './components/imgupload'
// import NiftiImg from './components/niftiImg'
import Model from './components/predict'
import Model3d from './components/predict3d'
// import ThreeDView from './components/3Ddisplay';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path="/nifti" element={<NiftiImg/> } /> */}
          <Route path="/unreal" element={<ImgUpload/>} />
          <Route path="/model" element={<Model/>} />
          <Route path="/3dmodel" element={<Model3d/>} />
          {/* <Route path="/3dview" element={<ThreeDView/>} /> */}
          {/* Add a default route for the root path */}
          {/* <Route path="/" element={<NiftiImg />} /> */}
        </Routes>
      </Router>
    </div>
  ); 
}

export default App;
