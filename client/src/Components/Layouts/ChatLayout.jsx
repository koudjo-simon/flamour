import React, { useEffect, useState } from 'react'
import styles from './chatLayout.module.css'
import profileImg from '../../images/profile-img.jpg'
import { Outlet, useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';


const ChatLayout = ({conversation, showDiscussions, showUserInfo, setConversation, setShowDiscussion, setShowUserInfo}) => {

    const navigate = useNavigate()

    useEffect(()=>{
        axiosPrivate.get("http://localhost:5000/chat/getall")
            .then((response) => {
                setConversation(response.data.conversation);
                console.log(response.data.conversation);
                /* localStorage.setItem("conv", conversation.conv_id); */
            }).catch((error) => {
                console.log(error)
                navigate("/login")
            })
    }, []);

    let convDiv = conversation.length > 0 && showDiscussions ? conversation.map((conversation) => {
        return (
            <div onClick={() => {
                localStorage.setItem("conv", conversation.id_conv);
                setConversation(conversation);
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
            <div className={styles.profile}>
                <img src={profileImg} alt="" />
            </div>
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
                 <a href="" className={styles.link_edit}>Modifier Information</a>
            </div>
            </div>
             }
            {showDiscussions &&  <div className={styles.conversations}>
                <h3>Conversations</h3>
                {/* <div>Alain</div>
                <div>Kodjo</div>
                <div>Kokou</div> */}
                {convDiv}
            </div>}
            <div className={styles.deconnecte}>
                <a href="" className={styles.link_deconnecte}>Déconnexion</a>
            </div>
        </div>

        <div>
            <Outlet/>
        </div>
    </main>
    </div>
  )
}

export default ChatLayout;