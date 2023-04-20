import Acceuil from "./Components/Pages/acceuil/Acceuil";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulaire1 from "./Components/Pages/inscription/Formulaire1";
import Formulaire2 from "./Components/Pages/inscription/Formulaire2";
import Formulaire3 from "./Components/Pages/inscription/Formulaire3";
import LayoutGeneral from "./Components/Layouts/LayoutGeneral";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route index element={<Acceuil />} />
            <Route path="inscription1" element={<Formulaire1/>} />
            <Route path="inscription2" element={<Formulaire2/>} />
            <Route path="inscription3" element={<Formulaire3/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;