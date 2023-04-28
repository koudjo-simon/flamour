import React, { useEffect } from 'react'
import styles from './chatLayout.module.css'
import { Outlet, useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';

const ChatLayout = ({userInfo, messages, setMessages, chatConversation, layoutConversation, showDiscussions, showUserInfo, setConversationUserClick, setLayoutConversation, setShowDiscussion, setShowUserInfo, setChatConversation, setSelectedConversationUser}) => {
    
    const navigate = useNavigate();

    useEffect(()=>{
        axiosPrivate.get("http://localhost:5000/chat/getall")
            .then((response) => {
                setLayoutConversation(response.data.conversation);
                console.log("Responses conv list", response);
                console.log("Conversations list", response.data.conversation);
                // localStorage.setItem("conv", conversation.conv_id);
            }).catch((error) => {
                console.log(error)
                navigate("/login")
            })
    }, []);

    let convDiv = layoutConversation.length > 0 && showDiscussions ? layoutConversation.map((conversation) => {
        return (
            <div /* className={} */ onClick={() => {
                localStorage.setItem("conv", conversation.id_conv);
                setChatConversation(conversation);
                const user = {
                    nom : conversation.nom,
                    prenom : conversation.prenom
                }
                axiosPrivate.post("http://localhost:5000/chat/getallmessages", {convId:conversation.id_conv})
                    .then((response) => {
                        console.log("Message object :", response.data.messages);
                        setMessages(response.data.messages);
                        console.log("Le message : ", messages);
                    }).catch((error) => {
                        console.log(error);
                    })
                setConversationUserClick(user);
                navigate("/chat/main/private");
            }} key={conversation.id_conv} className={styles.userConversation}>
                <span>
                    {`${conversation.nom} ${conversation.prenom}`}
                </span>
            </div>
        )
    }): null;

  return (
    <div>
        <main>
        <div className={styles.container_1}>
            <div className={styles.profile_div}>
                <div className={styles.profile}>
                    <img src={userInfo.photo} alt="" />
                </div>
                <div className={styles.userPseudo}>
                    { userInfo.pseudo }
                </div>
            </div>
            <div className={styles.message_info}>
            <div className={styles.message}>
                <div className={styles.message_view} onClick={
                    () => {
                        setShowDiscussion(true)
                        setShowUserInfo(false)
                    }
                }>
                    Messages
                </div>
                <div className={styles.info_view} onClick={
                    () => {
                        setShowUserInfo(true)
                        setShowDiscussion(false)
                    }
                }>
                    Info Utilisateur
                </div>
            </div>
            {showUserInfo && <div>
                <div className={styles.information}>
                <div className={styles.information_element}>Nom: </div> 
                <div className={styles.information_element}>Prénom: </div> 
                <div className={styles.information_element}>Email: </div> 
                <div className={styles.information_element}>Age: </div> 
                <div className={styles.information_element}>Sexe: </div>            
                <div className={styles.information_element}>Profession: </div> 
                <div className={styles.information_element}>Pays: </div> 
                <div className={styles.information_element}>Ville: </div>
            </div>
            <div className={styles.prefer}>
                <label htmlFor="">Préference:</label>
            </div>
            <div className={styles.edit}>
                 {/* <a href="" className={styles.link_edit}>Modifier Information</a> */}
                 Modifier Information
            </div> 
            </div>
             }
            {showDiscussions &&  <div className={styles.conversations}>
                <h3 className={styles.conversation_heading}>Conversations</h3>
                {/* <div>Alain</div>
                <div>Kodjo</div>
                <div>Kokou</div> */}
                {convDiv}
            </div>}
            </div>
        </div>
        <div className={styles.container}>
            <Outlet/>
        </div>
    </main>
    </div>
  )
}

export default ChatLayout;