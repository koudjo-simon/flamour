import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Acceuil from "./Components/Pages/acceuil/Acceuil";
import LayoutGeneral from "./Components/Layouts/LayoutGeneral";
import Connexion from "./Components/Pages/connexion/Connexion";
import Inscription from "./Components/Pages/inscription/Inscription"
import Chat from "./Components/Pages/chat/Chat";
import Protection from './Components/protection/Protection';
import Socket from './Components/Socket';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route index element={<Acceuil />} />
            <Route path="inscription" element={<Inscription/>} />
          </Route>
          <Route path="/login" element={<Connexion/>} />          
          <Route path="/chat" element={<Protection/>} >
            <Route index element={<Chat/>} />
          </Route>          
          <Route path='/socket' element={<Socket/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;