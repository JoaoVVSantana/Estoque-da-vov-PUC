import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento

  // Restaura o estado do usuário ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Converte para objeto
    }
    setLoading(false); // Define como carregado
  }, []);

  // Função de login simulada
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      const mockUser = { name: 'Admin', role: 'admin' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser)); // Armazena no localStorage
      return true;
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove do localStorage
  };

  // Valores fornecidos pelo contexto
  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);
