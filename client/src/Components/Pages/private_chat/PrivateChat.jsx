import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';
import styles from './privateChat.module.css';

function PrivateChat({socket, userId, conversation, setConversation}) {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");


    /* useEffect(()=>{
        axiosPrivate.get("http://localhost:5000/chat/getall")
            .then((response) => {
                setConversation(response.data.conversation);
                console.log(response.data.conversation);
            }).catch((error) => {
                console.log(error)
                // navigate("/login")
            })
    }, [navigate, conversation, setConversation]);
 */

    /* const joinConversation = (conversation) => {
        if (conversation.id_conv !== undefined) {
          socket.emit("joinConversation", conversation.id_conv);
        }
    } */

    useEffect(() => {
        socket.emit("joinConversation", conversation.id_conv);
    }, [conversation.id_conv, socket])

    useEffect(()=>{
        console.log(conversation.id_conv);
        console.log(localStorage.getItem("conv"));
        console.log("User Id: ", userId)
        axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:conversation.id_conv})
            .then((response) => {
                console.log("Message object :", response.data.messages);
                setMessages(response.data.messages);
            }).catch((error) => {
                console.log(error);
            })
    }, [conversation.id_conv, userId]);

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            console.log(data);
            axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:conversation.id_conv})
            .then((response) => {
                console.log("Message object :", response.data.messages);
                setMessages(response.data.messages);
            }).catch((error) => {
                console.log(error);
            })
        })
    }, [conversation.id_conv, socket])

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log(conversation.id_conv);
        let messageData = {
            room: conversation.id_conv,
            text: currentMessage,
            author: userId,
        }
        console.log("User Id ", userId);
        await socket.emit("send_message", messageData)
    }

    let messageDiv = messages.length > 0 ? messages.map((message) => {
        return (
            <div key={message.id_mes} className={styles.messageBox}>
                <div className={ Number(message.message_sender) === Number(userId) ? styles.first_user_message : styles.second_user_message }>
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
                <button></button>
            </form>
        </div>
    </div>
  )
}

export default PrivateChat