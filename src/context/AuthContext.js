import { createContext, useEffect, useState } from "react";
import {auth} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

// this progarm is to create context of user


export const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
const[currentUser,setCurrentUser]=useState({});
   //to check we have user or not we'll use useEffect
   useEffect(()=>{
     const sub=onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
      console.log(user);
    })
    return()=>{
        sub();
    };

   },[]);
    
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};





  
