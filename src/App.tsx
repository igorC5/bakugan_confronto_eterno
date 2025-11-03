import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./pages/inicio"
import NotFound from "./pages/NotFound"
import SelecaoModo from "./pages/SelecaoModo"
import Jogador from "./pages/Selecoes/Jogador"
import VsPlayer from "./pages/batalhas/vsPlayer"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/selecao" element={<SelecaoModo />} />
        <Route path="/jogador" element={<Jogador />} />
        <Route path="/batalha" element={<VsPlayer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
