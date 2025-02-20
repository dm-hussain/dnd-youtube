import { createContext, useContext } from "react";


const sidebarContext= createContext({
        isShow:'',
        toggleIsShow: (isShow)=>{}

})



export const useSidebar= ()=>{
       return useContext(sidebarContext)
}

export const SidebarProvider=  sidebarContext.Provider


