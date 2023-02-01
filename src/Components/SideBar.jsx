import React from 'react'
import './componentStyle.scss'
import {NavBar} from './NavBar'
import {Search} from './Search'
import {Chats} from './Chats'
export const SideBar = () => {
  return (
    <div className='sideBar'>
        <div className='s1'>
           <NavBar/>
           <Search/>
           <Chats/>
        </div>
    </div>
  )
}
