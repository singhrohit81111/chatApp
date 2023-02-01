import React, { useState } from 'react'
import './style.scss'
import add from "../images/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { async } from '@firebase/util';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //creating a user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore/database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,

            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

          } catch (error) {
            setErr(true);
          }
        });
      });

    }

    catch (err) {
      setErr(true);
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>FunShun</span >
        <span className='title'>Register</span >
        <form onSubmit={handleSubmit} className='formId'>
          <input type="text" className='inputtt' placeholder='Display name' />
          <input type="text" className='inputtt' placeholder='E-mail' />
          <input type="password" className='inputtt' placeholder='Password' />
          <label htmlFor="file">
            <img src={add} alt="Not Showing" />
            <span>Add an Avtar</span>
          </label>
          <input style={{ display: 'none' }} type="file" className='inputtt' id='file' />
          <button className='button'>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You donot have an account?<Link to="/Login">Login</Link></p>
      </div>
    </div>
  )
}











