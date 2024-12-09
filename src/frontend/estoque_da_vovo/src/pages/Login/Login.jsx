import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

import Logo from "../../assets/logo_lar_vovo.png"; // Sua logo

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Substitua pela sua lógica de autenticação real
    const isAuthenticated = login(inputUsername, inputPassword);
    if (isAuthenticated) {
      navigate("/"); // Redireciona para o dashboard
    } else {
      setShow(true); // Exibe o alerta de falha no login
    }
    setLoading(false);
  };

  const handlePassword = () => {
    // Lógica para recuperação de senha, se necessário
  };

  return (
    <div className="sign-in__wrapper">
      {/* Logo fora do card */}
      <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>

      <div className="sign-in__card">
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="h4 mb-2 text-center">Entrar</div>

          {/* Alerta de login inválido */}
          {show && (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              Usuário ou senha incorretos.
            </Alert>
          )}

          {/* Campos do formulário */}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Nome de usuário</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Digite seu nome de usuário"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Digite sua senha"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="checkbox">
            <Form.Check type="checkbox" label="Lembrar de mim" />
          </Form.Group>

          {!loading ? (
            <Button className="w-100 btn-entrar" variant="none"  type="submit">
              Entrar
            </Button>
          ) : (
            <Button className="w-100 btn-entrar"  type="submit" disabled>
              Entrando...
            </Button>
          )}

          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={handlePassword}
            >
              Esqueceu a senha?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
