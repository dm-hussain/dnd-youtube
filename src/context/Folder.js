import { createContext, useContext } from "react";


const FolderContext= createContext({
    folder: [
        {
            id:'',
            folderName: '',
            link:''
        }
    ],
             
            showCreateFolder: '',
             
            addFolder:()=>{},
            editFolderName:(id, folderName)=>{},
            removeFolder:(id)=>{},
            toggleCreateFolder:(showCreateFolder)=>{}

})

export const useFolder = ()=>{
    return useContext(FolderContext)
}

export const FolderProvider= FolderContext.Provider