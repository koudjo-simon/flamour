import Acceuil from "./Components/Pages/acceuil/Acceuil";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutGeneral from "./Components/Layouts/LayoutGeneral";
import Connexion from "./Components/Pages/connexion/Connexion";
import Inscription from "./Components/Pages/inscription/Inscription"

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;