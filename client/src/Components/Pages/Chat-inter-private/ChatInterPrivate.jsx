import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';
import styles from './chatInterPrivate.module.css';

const ChatInterPrivate = ({socket, userId, conversation, selectedUser, setConversation}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [newConvId, setNewConvId] = useState("");

    useEffect(() => {
        socket.emit("joinConversation", newConvId);
    }, [newConvId]);

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            console.log(data);
            axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:newConvId})
            .then((response) => {
                console.log("Message object :", response.data.messages);
                setMessages(response.data.messages);
            }).catch((error) => {
                console.log(error);
            })
        })
    }, [socket])

    const sendMessage = async (messageData) => {
        console.log("Sending message: ", messageData)
        await socket.emit("send_message", messageData)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let messageData = {
            text: currentMessage,
            author: userId,
            receiver: selectedUser.user_id
        }
        axiosPrivate.post("http://localhost:5000/chat/createconversation", messageData)
        .then((response) => {
            console.log("Response : ", response);
            setNewConvId(response.data.id_conv);
            let socketData = {
                room: response.data.id_conv,
                text: currentMessage,
                author: userId,
            }
            sendMessage(socketData);
        }).catch((error) => {
            console.log(error);
        })
        // await socket.emit("send_message", messageData)
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
            <h1>{`${selectedUser.nom} ${selectedUser.prenom}`}</h1>
        </div>
        <div className={styles.chatBody}>
            { messageDiv }
        </div>
        {/* <img src={img} alt='shool grade icon' /> */}
        <div className={styles.chatInputMessage}>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <textarea onChange={(e) => {setCurrentMessage(e.target.value)}}>
                    
                </textarea>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
  )
}

export default ChatInterPrivate;