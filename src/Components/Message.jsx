import React, { useContext, useRef ,useEffect} from 'react'
import rohit from "../images/rohit.jpg"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { serverTimestamp } from 'firebase/firestore';
import '../Components/componentStyle.scss'

export const Message = ({ message }) => { 
  const ref=useRef();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref} className='message owner'>
      <div className="messageInfo">
          <img className='i1' src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt="" />
          <span>Just Now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img className='i2' src={message.img} alt="" />}
      </div>
    </div>
  )
}
