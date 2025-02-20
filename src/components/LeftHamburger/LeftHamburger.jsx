import React, { useState } from 'react';
import { useSidebar } from '../../context/Sidebar';
import { useFolder } from '../../context/Folder';
 
function LeftHamburger() {
  const { isShow } = useSidebar();

const {allFolder, removeFolder, editFolderName} = useFolder()

//  removeFolder method execution..............

const deleteFolder =(id)=>{
  // console.log(e.target.parentElement.parentElement.remove());
  // console.log(idx);

removeFolder(id)
  
}

//  editFolderName method execution..............
const [isEditing, setIsEditing]= useState(false)
const [newName, setNewName]=useState('')

// const editFolder= (id)=>{
// setIsEditing((prev)=>(!prev))

// console.log('hii');

// editFolderName(id, newName)
// }

// const changeFolderName= (id)=>{
//   setIsEditing((prev)=> (!prev))
//   console.log(newName);
//    if(isEditing){
//     editFolderName(id, newName)
//     // editTask( { text: todoMsg }, todo.id)
//     setIsEditing(false)
//    }

// }


const handleVideo=(id)=>{
  // debugger
console.log(id);

const clickedVideo= allFolder.filter((folder)=>{
  return    folder.id === id
})

const videoUrl= clickedVideo[0].link
console.log(videoUrl);


 console.log( 'hh');
   
}
  

  return (
    <>
      <div
        className={`h-[calc(100vh-60px)] w-[18%] bg-red-700 absolute top-[55px] z-5
          overflow-y-auto px-2
          transition 
    transform duration-300 ease-in-out ${
      isShow ? 'translate-x-0' : 'translate-x-[-280px]'
    } `}
      >
        <div className="top-section   flex items-start  gap-4 p-2  mt-2 ">
       

          <span className=" ml-2 font-serif text-white text-sm md:text-xl lg:text-2xl ">
            Saved Folder
          </span>
        </div>

      


        {
          
        allFolder.map((folder) => {
          
            
          return  <div key={folder.id}      
          
          className='folder-box px-2 ml-2 mt-4 flex items-center justify-between gap-4 
          bg-white rounded-2xl' >
            <button 
            
            
            className='cursor-pointer' >
      <div className='flex gap-2'>
      
      <i 
      onClick={()=>{
        handleVideo(folder.id)
      } }
       
      className="fa-solid fa-play text-4xl text-red-500 "></i> 
     <input
    //  onChange={(e) => setNewName(e.target.value)}
     className='w-[70%] outline-0 border-none text-xl font-bold  '
      type="text" readOnly={!isEditing} value={folder.folderName} />
      </div>
      </button>

      <div className='flex gap-2'>
      {/* <button 
      onClick={()=>{
        changeFolderName(folder.id)
      }} 
      className="cursor-pointer "> 
       {
          isEditing? "📁" : "✏️"
        }
      
      </button>  */}
      <i
      onClick={()=>{
        deleteFolder(folder.id)
      }} 
      className="fa-solid fa-trash cursor-pointer p-2 bg-amber-600 overflow-hidden rounded-2xl text-white"></i>
      
      </div>
     
      </div>;
    
        })}



      </div>

    
 

    </>
  );
}

export default LeftHamburger;
