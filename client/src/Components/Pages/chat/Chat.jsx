
import React, { useEffect } from 'react'
import axiosPrivate from '../../../api/axiosPrivate';
import { useNavigate } from 'react-router-dom';
import styles from './chat.module.css'

function Chat() {
  const navigate = useNavigate();
  /* useEffect(()=>{
    axiosPrivate.post("/chat/getall", {userId:1})
      .then((response) => {console.log(response.data.conversation);})
      .catch((error)=>{
        console.log(error.response.status);
        if (error.response.status) {
          navigate("/login");
        }
      })
  }, []); */

  return (
    <>
        <h1>Chat</h1>
        <div className={styles.container_2} onClick={()=>{
          navigate("/chat/main/private")
        }}>
            <div className={styles.centered_element}>
                <div className=""></div>
                <div className=""></div>
            </div>
            
            <div className=""></div>
            
        </div>
    </>
  )
}

export default Chat;