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

  const [conversation, setConversation] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const [showDiscussions, setShowDiscussion] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const socket = io.connect("http://localhost:5000");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route index element={<Acceuil />} />
            <Route path="inscription" element={<Inscription />} />
          </Route>
          <Route path="/login" element={<Connexion setUserId={setUserId} />} />          
          <Route path="/chat" element={<Protection />} >
            <Route path='main' element={<ChatLayout socket={socket} showDiscussions={showDiscussions} showUserInfo={showUserInfo} conversation={conversation} setConversation={setConversation} setShowDiscussion={setShowDiscussion} setShowUserInfo={setShowUserInfo} />}>
              <Route index element={<Chat conversation={conversation} setSelectedUser={setSelectedUser} setConversation={setConversation} />} />
              <Route path='private' element={<PrivateChat socket={socket} userId={userId} conversation={conversation} setConversation={setConversation} />} />
              <Route path='init' element={<ChatInterPrivate socket={socket} userId={userId} selectedUser={selectedUser} conversation={conversation} setConversation={setConversation} />} />
            </Route>
          </Route>
          <Route path='test' element={<UserCard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;