import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Acceuil from "./Components/Pages/acceuil/Acceuil";
import LayoutGeneral from "./Components/Layouts/LayoutGeneral";
import Connexion from "./Components/Pages/connexion/Connexion";
import Inscription from "./Components/Pages/inscription/Inscription"
import Chat from "./Components/Pages/chat/Chat";
import Protection from './Components/protection/Protection';
import ChatLayout from './Components/Layouts/ChatLayout';
import PrivateChat from './Components/Pages/private_chat/PrivateChat';
import ChatInterPrivate from './Components/Pages/Chat-inter-private/ChatInterPrivate'

import { io } from 'socket.io-client';
import UserCard from './Components/Pages/user_card/UserCard';

const App = () => {

  const [layoutConversation, setLayoutConversation] = useState([])
  const [chatConversation, setChatConversation] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedConversationUser, setSelectedConversationUser] = useState("");
  const [conversationUserClick, setConversationUserClick] = useState({})

  const [showDiscussions, setShowDiscussion] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [messages, setMessages] = useState([]);

  const [inscriptionPseudo, setInscriptionPseudo] = useState("");

  const socket = io.connect("http://localhost:5000");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route index element={<Acceuil />} />
            <Route path="inscription" element={<Inscription setInscriptionPseudo={setInscriptionPseudo} />} />
          </Route>
          <Route path="/login" element={<Connexion inscriptionPseudo={inscriptionPseudo} setUserInfo={setUserInfo} />} />        
          <Route path="/chat" element={<Protection />} >
            <Route path='main' element={<ChatLayout setMessages={setMessages} userInfo={userInfo} socket={socket} showDiscussions={showDiscussions} showUserInfo={showUserInfo} layoutConversation={layoutConversation} setLayoutConversation={setLayoutConversation} setShowDiscussion={setShowDiscussion} setShowUserInfo={setShowUserInfo} setChatConversation={setChatConversation} setSelectedConversationUser={setSelectedConversationUser} setConversationUserClick={setConversationUserClick} />}>
              <Route index element={<Chat userInfo={userInfo} chatConversation={chatConversation} setSelectedUser={setSelectedUser} setChatConversation={setChatConversation} />} />
              <Route path='private' element={<PrivateChat messages={messages} setMessages={setMessages} conversationUserClick={conversationUserClick} socket={socket} userInfo={userInfo} chatConversation={chatConversation} setChatConversation={setChatConversation} selectedConversationUser={selectedConversationUser} />} />
              <Route path='init' element={<ChatInterPrivate socket={socket} userInfo={userInfo} selectedUser={selectedUser} chatConversation={chatConversation} setChatConversation={setChatConversation} setLayoutConversation={setLayoutConversation} />} />
            </Route>
          </Route>
          <Route path='test' element={<UserCard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;