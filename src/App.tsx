import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./pages/inicio";
import NotFound from "./pages/NotFound";
import SelecaoModo from "./pages/SelecaoModo";
import Jogador from "./pages/Selecoes/Jogador";
import VsPlayer from "./pages/batalhas/vsPlayer";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/selecao"
          element={
            <PrivateRoute>
              <SelecaoModo />
            </PrivateRoute>
          }
        />

        <Route
          path="/jogador"
          element={
            <PrivateRoute>
              <Jogador />
            </PrivateRoute>
          }
        />

        <Route
          path="/batalha"
          element={
            <PrivateRoute>
              <VsPlayer />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;