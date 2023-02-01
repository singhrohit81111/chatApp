import React from 'react'
import add from "../images/add.png"
import cam from "../images/cam.png"
import more from "../images/more.png"
import { Messages } from './Messages'
import { Input } from './Input'
import '../Components/componentStyle.scss'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
export const Chat = () => {
  const {data}=useContext(ChatContext);
  return (
    <div className='chat'>
        <div className='chatInfo'>
          <span className='sd1'>{data.user.displayName}</span>
          <div className="chatIcons">
            <img className='iimg'  src={add} alt="" />
            <img className='iimg' src={cam} alt="" />
            <img className='iimg' src={more} alt="" />
          </div>
          
        </div>
        <Messages/>
          <Input/>
    </div>
  )
}
