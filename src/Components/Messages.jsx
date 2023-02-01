import React, { useContext,useState,useEffect} from 'react'
import { Message } from './Message'
import '../Components/componentStyle.scss'
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
export const Messages = () => {
    const [messages,setMessages]=useState([]);
    const {data}=useContext(ChatContext);
    useEffect(()=>{
      const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
        //if mesaages/doc exsits then set MEssagea according to the need
        doc.exists() && setMessages(doc.data().messages);
      })
      return()=>{
        unsub();
      }
      },[data.chatId]);
    
          
  return (
    <div className='messages'>
        {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))} 
    </div>
  )
}
