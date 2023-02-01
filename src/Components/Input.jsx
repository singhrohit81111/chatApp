import React, { useState,useContext } from 'react'
import '../Components/componentStyle.scss'
import attach from "../images/attach.png"
import img from "../images/img.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, Timestamp, updateDoc,serverTimestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import{v4 as uuid} from'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const Input = () => {
  const[text,setText]=useState("");
  const[img,setImg]=useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend=async()=>{ 
     if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              //TO update array we have used arrayunion
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                //differnce id just we are alsoi updating imgae in array
                img: downloadURL,
              }),
            });
          });
        }
      );
     }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
     }
     await updateDoc(doc(db,"userChats",currentUser.uid),{
       [data.chatId+".lastMessage"]:{
        text,
       },
       [data.chatId+".date"]:serverTimestamp(),
      }
     )
     await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
       text,
      },
      [data.chatId+".date"]:serverTimestamp(),
     }
    )
    setText("");
    setImg(null);
  }
  return (
    <div className='inputt'>
      <input className='ip' type="text"  placeholder='Type Something...' onChange={(e)=>setText(e.target.value)} value={text} />
      <div className="send">
        <img className='ig' src={attach} alt="" />
        <input id='fl' type="file" style={{display:'none'}} onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="fl"><img className='ig' src={img} alt="" /></label>
        <button className='btt' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
