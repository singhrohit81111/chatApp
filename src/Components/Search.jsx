import { async } from '@firebase/util';
import React, { useContext, useState } from 'react'
import{db} from '../firebase';
import { collection, query, where,setDoc,doc,updateDoc,serverTimestamp,getDoc, getDocs} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import '../Components/componentStyle.scss'



export const Search = () => {
    const[username,setUsername]=useState("");//user to be find in searchbar
    const[user,setUser]=useState(null);//actual user
  const[err,setErr]=useState(false);

  const {currentUser}=useContext(AuthContext);
 //To handle search we have created a query from firebase which will find th user
const handleSearch=async()=>{
    const q = query(collection(db, "users"), where("displayName", "==", username));
     
  //To retrive/get the user info from query
  try {
    const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
          setUser(doc.data());
    });
  } catch (err) {
    setErr(true);
  }
}
const handleKey=(e)=>{
    e.code ==="Enter" && handleSearch();
};
const handleSelect=async()=>{
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =currentUser.uid > user.uid? currentUser.uid + user.uid: user.uid + currentUser.uid;
        
  try {
    const res=await getDoc(doc(db,"chats",combinedId));
    if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db,"chats",combinedId),{messages: []});
        //create userchats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedId + ".userInfo"]: {
               uid:user.uid,
               displayName:user.displayName,
               photoURL:user.photoURL
            },
            [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db,"userChats",user.uid),{
            [combinedId+ ".userInfo"]:{
                uid:currentUser.uid,
                displayName:currentUser.displayName,
                photoURL:currentUser.photoURL,
            },
            [combinedId + ".date"]:serverTimestamp(),
        });
    }

  } catch (error) {
   
  } 
  
  setUser(null);
  setUsername("");
};
  return (
    <div className='search'>
        <div className='ss1'>
            <input className='ss2' type="text" placeholder='Search Here' value={username} onKeyDown={handleKey} onChange={(e)=>{setUsername(e.target.value)}}/>
              
        </div>
        {err && <span>user not found!</span>}
        {user && (<div className="userChat" onClick={handleSelect}>
        <img className='imgg' src={user.photoURL} alt="" />
        <div className="userChatInfo">
            <span className='ss3'>{user.displayName}</span>
            <p>Hello</p>
        </div>
    </div>)}
  
    </div>
  )
}









