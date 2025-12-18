/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/auth/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
// REMOVIDO: import { supabase } from "@/integrations/supabase/client";
import { loginApi, getProfileApi, signupApi } from "@/api/authService"; // IMPORTADO
import { AuthRequest } from "@/api/types/authTypes"; // IMPORTADO

// ------------------------------------------------------------
// 🧩 Tipagens
// ------------------------------------------------------------
interface User {
  id: string; // AGORA SERÁ O UUID REAL
  email: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthRequest) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  can: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chaves do Local Storage
const TOKEN_KEY = "guideaut_access_token";
const REFRESH_KEY = "guideaut_refresh_token";

// ------------------------------------------------------------
// 🧭 Provedor de Autenticação
// ------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const bootstrapped = useRef(false);

  // Efeito inicial: Tenta carregar dados do usuário se houver token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // ------------------------------------------------------------
  // 🧠 Função para carregar dados do usuário (do backend Spring)
  // ------------------------------------------------------------
  const loadUserData = async () => {
    try {
      // O interceptor do Axios em 'api/client.ts' já injeta o token
      const { data } = await getProfileApi(); // Chama GET /me

      // CORREÇÃO AQUI: Usar data.id e data.roles reais
      setUser({
        id: data.id, // <-- USA O UUID VINDO DO BACKEND
        email: data.email,
        name: data.name || data.email.split("@")[0],
        roles: data.roles || [], // <-- USA AS ROLES VINDAS DO BACKEND
      });
    } catch (error) {
      console.error("❌ Erro ao carregar dados do usuário:", error);
      // Se deu erro (token expirado), força o logout
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------
  // 🔑 Login
  // ------------------------------------------------------------
  const login = async (credentials: AuthRequest) => {
    const { data } = await loginApi(credentials); // Chama POST /auth/login

    // Salva os tokens recebidos do backend
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_KEY, data.refreshToken);

    // Carrega os dados do usuário (/me) e atualiza o estado
    await loadUserData();
  };

  const logout = async () => {
    // TODO: Chamar /auth/logout do backend (passando o refresh token)
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setUser(null);
  };

  // ------------------------------------------------------------
  // 📝 Cadastro
  // ------------------------------------------------------------
  const signup = async (data: any) => {
    try {
      const payload = {
        nome: data.name,
        email: data.email,
        password: data.password,
      };

      await signupApi(payload);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };

  // ------------------------------------------------------------
  // 🛡️ Verificação de permissões
  // ------------------------------------------------------------
  const can = (role: string): boolean => {
    if (!user) return false;
    // Verifica se o array de roles do usuário contem a role desejada
    return user.roles.includes(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ------------------------------------------------------------
// ⚙️ Hook de uso do contexto
// ------------------------------------------------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
};
