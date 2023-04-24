import React, { useEffect } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';

function PrivateChat({userId, conversation}) {

    useEffect(()=>{
        console.log(conversation.id_conv);
        console.log(localStorage.getItem("conv"));
        axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:conversation.id_conv})
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

  return (
    <div>PrivateChat</div>
  )
}

export default PrivateChat