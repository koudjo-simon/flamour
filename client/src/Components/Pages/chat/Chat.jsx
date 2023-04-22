
import React, { useEffect } from 'react'
import axiosPrivate from '../../../api/axiosPrivate';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  useEffect(()=>{
    axiosPrivate.post("/chat/getall", {userId:1})
      .then((response) => {console.log(response.data.conversation);})
      .catch((error)=>{
        console.log(error.response.status);
        if (error.response.status) {
          navigate("/login");
        }
      })
  }, []);

  return (
    <div>
        <h1>Chat Page</h1>
    </div>
  )
}

export default Chat;