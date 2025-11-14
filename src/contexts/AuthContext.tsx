import { api } from "@/api";
import { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto
export const AuthContext = createContext<any>(null);

// Hook para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  // user será o nome de usuário ou null
  const [user, setUser] = useState<string | null>(null);

  const [enviando, setEnviando] = useState(false);

  // carregar usuário salvo em cache ao iniciar
  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(cachedUser);
    }
  }, []);

  // função logar(): envia user e senha ao backend
  async function logar(user: string, senha: string) {
    if (enviando) return false;
    setEnviando(true);

    try {
      if (user === '' || senha === '') {
        return false;
      }
      const resposta = await api.post('/login', {
        user,
        senha,
      });

      const dados = resposta.data;

      localStorage.setItem("user", dados.user);
      setUser(user);
      return true;
    } catch (erro: any) {
      alert(erro.response.data.erro)
      return false;
    } finally {
      setEnviando(false)
    }
  }

  // função deslogar(): limpa o cache
  function deslogar() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, logar, deslogar, enviando }}>
      {children}
    </AuthContext.Provider>
  );
}
