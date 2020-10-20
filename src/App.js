import React, { useState } from 'react';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import Resize from './Resize';

const App = () => {

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
        <Title/>
        <UploadForm/>
        <ImageGrid setSelectedImg={setSelectedImg} />
        { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
        <Resize/>
    </div>
  );
}

export default App;
