import logo from './logo.png';
import tb from './tb.png';
import { MdCloudUpload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

import { useState } from 'react';

const BACKEND_URL = "http://127.0.0.1:5000";


function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const detectTuberculosis = async () => {
    setLoading(true);
    console.log('Detecting Tuberculosis...');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result)
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App bg-gradient-to-b from-black to-gray-500 min-h-screen pb-40">
      <div className="flex flex-col">
        <div className='flex flex-row items-center justify-center'>
          <img src={logo} alt="logo" width={300} />
        </div>
        <h1 className='text-center text-3xl font-bold pt-6 text-white/70'>Tuberculosis Detection</h1>
        <div className='flex flex-row mx-80 pt-6 space-x-20'>
          <div className='w-1/2 flex items-center h-[20rem] justify-center'>
            <h1 className='text-lg text-justify text-white/90'>DeepCure is a cutting-edge solution harnessing the power of deep learning to revolutionize tuberculosis detection. By leveraging advanced algorithms and machine learning techniques, DeepCure offers a swift and accurate diagnosis, aiding in the early identification and treatment of tuberculosis cases. </h1>
          </div>
          <div className='w-1/2'>
            <img src={tb} alt="tb" width={450} />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold pt-6 text-white/70">Upload an image to detect tuberculosis using deep learning.
        </h1>

        <div className='flex items-center justify-center pt-4'>
          <label className='w-60 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'>
            <MdCloudUpload size={24} className='mr-2' />
            <span className='text-md font-bold'>UPLOAD</span>
            <input
              type='file'
              className='hidden'
              onChange={handleChange}
              accept='image/*' // Limit to image files
            />
          </label>
        </div>
        {file && (
          <div className='mt-6 flex justify-center items-center'>
            <div className='relative'>
              <img
                src={URL.createObjectURL(file)}
                alt='Selected Image'
                className='mt-2 border'
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
              <IoCloseCircle onClick={() => {
                setFile(null)
                setResult(null)
              }} size={28} className='absolute right-6 top-8 -mt-8 -mr-8 text-red-500 cursor-pointer' />
            </div>

          </div>
        )}

        {file && (
          <div className='flex items-center justify-center pt-4'>
            <button disabled={loading} onClick={detectTuberculosis} className='w-60 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer'>
              {!loading ? (
                <span className='text-md font-bold'>DETECT</span>
              ) :
                (<span className='text-md font-bold'>DETECTING</span>)
              }
            </button>
          </div>
        )}

        {result !== null && (
          <h1 className="text-center text-lg font-bold pt-6 text-white/70">
            Your XRay results are{" "}
            <span className={result === 1 ? "text-red-500" : "text-green-500"}>
              {result === 1 ? "Positive" : "Negative"}
            </span>{" "}
            for Tuberculosis.{" "}
            {result === 1 ? (
              "Please consult a doctor for further diagnosis and treatment."
            ) : (
              "You are healthy and do not require further treatment."
            )}
          </h1>
        )}


      </div>

    </div>
  );
}

export default App;
