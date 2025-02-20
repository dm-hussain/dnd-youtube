import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import LeftHamburger from './components/LeftHamburger/LeftHamburger';
import { SidebarProvider } from './context/Sidebar';
import CreateFolder from './components/CreateFolder/CreateFolder';
import { FolderProvider } from './context/Folder';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const toggleIsShow = () => {
    setIsShow((prev) => !prev);
  };

  const toggleCreateFolder = () => {
    setShowCreateFolder((prev) => !prev);
  };

  // Create states for allFolder
  const [allFolder, setAllFolder] = useState([]);
  

  // Save Folder method setup

  const addFolder = (folder) => {
    setAllFolder((prev) => [{ id: Date.now(), ...folder }, ...prev]);

  };

 

  // Remove Folder method setup

  const removeFolder = (id) => {
    console.log(id);

    const restFolder = allFolder.filter((folder) => {
      return folder.id !== id;
    });

    setAllFolder(restFolder);

    if(allFolder.length===1){
      localStorage.setItem('allFolder', JSON.stringify([]))

    }
  };

  // Edit Folder method setup..........

  const editFolderName = (id, newName) => {
    // if (newName==='') return alert('Folder name cant be empty')

    setAllFolder((prev) => {
 
      prev.map((prevFolder) => {
        prevFolder.id === id ? (prevFolder.folderName = newName) : prevFolder;
      });
    });

  };





  // Local Storage..............

  useEffect(() => {
    try {
      const storedFolders = localStorage.getItem('allFolder');
      const parsedFolders = storedFolders ? JSON.parse(storedFolders) : []; // ✅ Prevents parsing errors
  
      setAllFolder(parsedFolders);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setAllFolder([]); // ✅ Fallback to empty array if parsing fails
    }
  }, []);
  

  useEffect(()=>{
    if(allFolder && allFolder.length){
      localStorage.setItem('allFolder', JSON.stringify(allFolder))
    }
  },[allFolder, setAllFolder])

  return (
    <SidebarProvider value={{ isShow, toggleIsShow }}>
      <FolderProvider
        value={{
          showCreateFolder,
          toggleCreateFolder,
          allFolder,
          addFolder,
          removeFolder,
          editFolderName,
        }}
      >
        <Header toggle={toggleCreateFolder} />

        <LeftHamburger>
          {
      
          allFolder.map((folder) => {

           return <div
              key={folder.id}
              className="folder-box px-2 ml-2 mt-4 flex items-center justify-between gap-4 bg-white"
            >
            </div>
})
          
          }
        </LeftHamburger>

        <CreateFolder />
      </FolderProvider>
    </SidebarProvider>
  );
}

export default App;
