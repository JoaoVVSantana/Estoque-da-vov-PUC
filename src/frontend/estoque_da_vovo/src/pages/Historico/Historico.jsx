import React, { useState } from "react";
import { axiosInstanceEstoque } from "../../../services/axiosInstance.js";
import { useNavigate } from "react-router-dom";

export default function FormDoador() {
    const [formData, setFormData] = useState({
        nome: "",
        email: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const exibirMensagem = (tipo, mensagem) => {
        console.log(`${tipo.toUpperCase()}: ${mensagem}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axiosInstanceEstoque.post("/doadores/cadastrar", formData);
            exibirMensagem("sucesso", "Doador cadastrado com sucesso!");
            setFormData({ nome: "", email: "" });
            navigate("/doadores");
        } catch (error) {
            setError("Erro ao cadastrar o doador.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nome Completo:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

            <label>E-mail:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            {loading && <p>Carregando...</p>}
            {error && <p className="error">{error}</p>}

            <button type="submit">Cadastrar</button>
        </form>
    );
}
