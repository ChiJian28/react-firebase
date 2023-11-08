import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { storage } from '../config/firebase';
import { useState } from 'react';

const Upload = () => {
    const [fileUpload, setFileUpload] = useState(null);

    const uploadFile = async () => {
        if (!fileUpload) {
            return;
        }
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);       // folder_name/file_name
        try {
            await uploadBytes(filesFolderRef, fileUpload);      // (whr, what)
            alert('You have uploaded file');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center mb-[200px]">
            <h1 className='mb-24 text-6xl text-lime-500'>Upload File</h1>
            <input
                type="file"
                onChange={(e) => { setFileUpload(e.target.files[0]) }}
                className="w-64 p-2 mb-5 rounded border bg-gray-100 hover:bg-gray-200 focus:outline-none"
            />
            <button
                onClick={uploadFile}
                className="w-64 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                Upload File
            </button>
        </div>
    )
}

export default Upload