import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Acceuil from "./Components/Pages/acceuil/Acceuil";
import LayoutGeneral from "./Components/Layouts/LayoutGeneral";
import Connexion from "./Components/Pages/connexion/Connexion";
import Inscription from "./Components/Pages/inscription/Inscription"
import Chat from "./Components/Pages/chat/Chat";
import Protection from './Components/protection/Protection';
import Socket from './Components/Socket';
import ChatLayout from './Components/Layouts/ChatLayout';
import PrivateChat from './Components/Pages/private_chat/PrivateChat';

const App = () => {

  const [conversation, setConversation] = useState([]);
  const [userId, setUserId] = useState("");

  const [showDiscussions, setShowDiscussion] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);

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
            <Route path='main' element={<ChatLayout showDiscussions={showDiscussions} showUserInfo={showUserInfo} conversation={conversation} setConversation={setConversation} setShowDiscussion={setShowDiscussion} setShowUserInfo={setShowUserInfo} />}>
              <Route index element={<Chat />} />
              <Route path='private' element={<PrivateChat userId={userId} conversation={conversation} />} />
            </Route>
          </Route>
          <Route path='/socket' element={<Socket />} />              
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;