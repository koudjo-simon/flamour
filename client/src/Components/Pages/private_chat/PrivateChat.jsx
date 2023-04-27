import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';
import styles from './privateChat.module.css';

function PrivateChat({socket, userInfo, chatConversation, setChatConversation}) {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");


    /* useEffect(()=>{
        
    }, []); */


    /* const joinConversation = (conversation) => {
        if (conversation.id_conv !== undefined) {
          socket.emit("joinConversation", conversation.id_conv);
        }
    } */

    useEffect(() => {
        console.log("Joining ...", chatConversation.id_conv);
        socket.emit("joinConversation", chatConversation.id_conv);
    }, [])

    useEffect(()=>{
        console.log(chatConversation.id_conv);
        console.log(localStorage.getItem("conv"));
        console.log("User Id: ", userInfo.userId);
        console.log("Chat conversation", chatConversation);
        axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:chatConversation.id_conv})
            .then((response) => {
                console.log("Message object :", response.data.messages);
                setMessages(response.data.messages);
                console.log("Le message : ", messages);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        socket.on("receive id", (data) => {
            console.log("Test receive ID ", data);
            axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:chatConversation.id_conv})
            .then((response) => {
                // console.log("Message object Private chat :", response.data.messages);
                console.log("Receiving message request ",response);
                // setMessages([]);
                setMessages(response.data.messages);
            }).catch((error) => {
                console.log(error);
            })
        })
    }, [socket])

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            console.log("Receive message Data", data);
            axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:chatConversation.id_conv})
            .then((response) => {
                // console.log("Message object Private chat :", response.data.messages);
                console.log("Receiving message request ",response);
                // setMessages([]);
                setMessages(response.data.messages);
            }).catch((error) => {
                console.log(error);
            })
        })
    }, [socket]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log(chatConversation.id_conv);
        let messageData = {
            room: chatConversation.id_conv,
            text: currentMessage,
            author: userInfo.userId,
            //receiver: 
        }
        console.log("User Id ", userInfo.userId);

        await socket.emit("send_message", messageData);

    }

    let messageDiv = messages.length > 0 ? messages.map((message) => {
        return (
            <div key={message.id_mes} className={styles.messageBox}>
                <div className={ Number(message.message_sender) === Number(userInfo.userId) ? styles.first_user_message : styles.second_user_message }>
                        {/* <div className={styles.buble}> */}
                            <p>
                                Fake text
                            </p>
                            <p>
                                { message?.text }
                            </p>
                        {/* </div> */}
                    {/* <span className={styles.author}></span> */}
                </div>
            </div>
        )
    }): null;

  return (
    <div className={styles.privateChatContainer}>
        <div className={styles.chatHeader}>
            <h1>Header div</h1>
        </div>
        <div className={styles.chatBody}>
            { messageDiv }
        </div>
        <div className={styles.chatInputMessage}>
            <form onSubmit={(e)=>{handleSendMessage(e)}}>
                <textarea onChange={(e) => {setCurrentMessage(e.target.value)}}>
                    
                </textarea>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
  )
}

export default PrivateChat