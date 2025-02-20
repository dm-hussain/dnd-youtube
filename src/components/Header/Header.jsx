import React, { useEffect, useRef, useState } from 'react';
import { useSidebar } from '../../context/Sidebar';
import { useFolder } from '../../context/Folder';
import YoutubeData from '../Youtube/Youtube';

export default function Header({toggle}) {

 
 const {isShow, toggleIsShow} = useSidebar()
 
const handleClick= ()=>{
    toggleIsShow(isShow)  

}

// const {toggleCreateFolder, showCreateFolder} =useFolder()

// const createFolder= ()=>{
//   console.log('lll');
 
//   toggle(showCreateFolder)
//       toggleCreateFolder(showCreateFolder)
// }



// Handle input field
  let userInpRef= useRef(null)
  const [yPlayListId, setYPlayListId]= useState('')
  const [yVideoId, setYVideoId]= useState('')

  const handleUserInp =()=>{
    // debugger
    const userUrl= userInpRef.current.value
   if(userInpRef.current.value===''){
      alert('Plz enter valid url');
      userInpRef.current.focus()
   }

   const output= getYouTubeUrlType(userUrl)
   console.log(output);
   

    userInpRef.current.value=''
    
  }

  useEffect(()=>{
    console.log(yPlayListId);
    console.log(yVideoId);
    
  }, [yPlayListId, yVideoId])






 

  function getYouTubeUrlType(url) {
    try {
      const urlObj = new URL(url);
  
      // Extract hostname
      const hostname = urlObj.hostname.replace("www.", ""); // Normalize hostname
  
      // Check if it's a valid YouTube domain
      if (!["youtube.com", "youtu.be"].includes(hostname)) {
        return "Invalid YouTube URL";
      }
  
      // Extract video ID and playlist ID
      let videoId = urlObj.searchParams.get("v"); // Normal YouTube link
      const playlistId = urlObj.searchParams.get("list");
  
      // Handle youtu.be (shortened link format)
      if (!videoId && hostname === "youtu.be") {
        videoId = urlObj.pathname.substring(1); // Extract from pathname
        setYVideoId(videoId);
      }
  
      // Determine type
      if (videoId && playlistId) {
        setYVideoId(videoId);
        return "Video inside a Playlist";
      } else if (videoId) {
        setYVideoId(videoId);
        return "Single Video";
      } else if (playlistId) {
        setYPlayListId(playlistId);
        return "Playlist";
      } else {
        return "Invalid YouTube URL";
      }
    } catch (error) {
      return "Invalid URL format";
    }
  }
  
  
 
 

  return (
    <>
      <div className="w-full h-[60px] header-section mx-auto fixed top-0 z-11 ">
        <div className=" mx-auto h-14  bg-[#0F0F0F] flex items-center justify-between px-2">

            {/* left section... */}
          <div className="left-section w-[30%] md:w-[35%] h-[100%] flex items-center gap-4   ">
            <i onClick={handleClick} className="fa-solid fa-bars text-2xl px-2 text-gray-300  cursor-pointer "></i>
            <i className="fa-brands fa-youtube   text-red-700 cursor-pointer text-sm md:text-xl lg:text-2xl  ">
              
              <span className=" font-serif text-white text-sm md:text-xl lg:text-2xl">DND Youtube</span>
            </i>
          </div>

          {/* Middle section */}

          <div className="middle-section w-[40%] md:w-[50%] h-[70%]  border-[0.5px]  border-[#c6c6c6] rounded-2xl   flex items-center justify-between">
            <input
              ref={userInpRef}
              type="text"
              placeholder="Enter URL of Playlist/Video"
              className=" w-[80%] lg:w-[90%]  h-[100%]  px-4  focus:border-blue-600 border   border-transparent text-gray-300 rounded-tl-2xl rounded-bl-2xl  focus:outline  focus:outline-blue-600"
            />
           
 

            <div className="h-[100%] w-[20%] md:w-[10%] flex items-center justify-center border  border-gray-500 bg-[#605E5E] overflow-hidden  rounded-br-2xl  rounded-tr-2xl cursor-pointer">
              <i
              onClick={handleUserInp}
               className="fa-solid fa-magnifying-glass text-lg  md:text-2xl p-2  flex items-center justify-center text-[#edeaea]"></i>
            </div>
          </div>


{/* right section */}

          <div className="right-section w-[20%] md:w-[15%]  h-[100%] flex items-center  ">
            <button 
            onClick={toggle}
            className="text-center mx-auto text-xl font-semibold cursor-pointer text-gray-300">
              <span className="text-md md:text-xl lg:text-2xl">+</span> Create
            </button>
          </div>
        </div>
      </div>




      {/* <YoutubeData className=''
      videoId={yVideoId}
      playListId={yPlayListId}
      /> */}

<YoutubeData key={`${yVideoId}-${yPlayListId}`} videoId={yVideoId} playListId={yPlayListId} />


    </>
  );
 

  

}
