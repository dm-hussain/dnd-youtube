import React, { useState, useRef, useEffect } from 'react';
import { useFolder } from '../../context/Folder';

function CreateFolder() {
  const inputRef = useRef(null);

  const [inputLinkVal, setInpLinkVal] = useState('');

  const handleLinkInput =(e)=>{
    console.log(e.target.value);
    setInpLinkVal(e.target.value)
      }

  const [inputNameVal, setInpNameVal] = useState('');

  const handleNameInput = (e) => {
    setInpNameVal(e.target.value);
  };

 

  // ...................................................................
  const { addFolder, toggleCreateFolder, showCreateFolder } = useFolder();

  const closeCreateFolder = () => {
    toggleCreateFolder(showCreateFolder);
    setInpLinkVal('')
    setInpNameVal('')
  };

  const add = (e) => {
    e.preventDefault();
    handleSaveFolder();
  };

  const handleSaveFolder = () => {
    if (inputRef.current.value === '')
      return alert('Folder name cant be empty');

    addFolder({ folderName: inputNameVal, link: inputLinkVal });

    setInpNameVal('');
  };

  // .................

  useEffect(() => {
    inputRef.current.focus();
  }, [showCreateFolder, addFolder]);

  return (
    <>
      <div
        className={`absolute ${
          showCreateFolder
            ? 'top-[50%] right-[50%] translate-x-[50%]  scale' // Centered
            : 'top-0 right-0 scale-0'
        } transition-all duration-500 ease-in-out flex justify-center items-center z-31`}
      >
        <form
          onSubmit={add}
          className="folder-popup   w-[350px] h-[180px] px-2 flex gap-2 flex-col justify-center items-center rounded-2xl bg-red-700"
        >
          <input
            className="w-[100%] px-4 border border-gray-400 rounded-2xl mt-3 py-2 shadow outline-white text-lg text-white"
            type="text"
            placeholder="Enter Video/Playlist Link"
            value={inputLinkVal}
            onChange={handleLinkInput}
            ref={inputRef}
          />

<input
            className="w-[100%] px-4 border border-gray-400 rounded-2xl mt-3 py-2 shadow outline-white text-lg text-white"
            type="text"
            placeholder="Video/Playlist Name..."
            value={inputNameVal}
            onChange={handleNameInput}
            ref={inputRef}
          />
          <button
            type="submit"
            className="cursor-pointer h-[20%] px-5 overflow-hidden rounded-xl bg-white"
          >
            Save
          </button>

          <p
            onClick={closeCreateFolder}
            className="absolute -top-6 right-0 cursor-pointer"
          >
            &#10060;
          </p>
        </form>
      </div>
    </>
  );
}

export default CreateFolder;
