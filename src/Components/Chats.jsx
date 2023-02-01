import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import '../Components/componentStyle.scss'
import{db} from '../firebase';
import { ChatContext } from '../context/ChatContext';

export const Chats = () => {
  const [chats,setChats]=useState([]);
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);
  //To get real time chats/data we use onSnapshots
  useEffect(()=>{
    const getChats=()=>{
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.uid),(doc) => {
      setChats(doc.data());
      });
      return()=>{
        unsub();
      };
    }
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u});
  }
  return (
  
    <div className='sf1'>
      {Object.entries(chats)?.sort((a,b)=>(b[1].date-a[1].date)).map((chat)=>(
    <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img className='imgg' src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
            <span className='ss3'>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>))}
    </div>
  )
}






