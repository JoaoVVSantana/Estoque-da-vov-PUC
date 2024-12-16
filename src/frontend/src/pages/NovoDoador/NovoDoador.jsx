import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumbNav from "../../components/BreadCrumbNav/BreadCrumbNav.jsx";
import TitleContent from "../../components/TitleContent/TitleContent.jsx";
import FormDoador from "./FormDoador/FormDoador.jsx";
import Alert from "react-bootstrap/Alert";

import { axiosInstanceEstoque } from "../../services/axiosInstance.js";
import useAxios from "../../hooks/useAxios.js";

export default function NovoDoador() {
    const navigate = useNavigate();

    // Estados do hook useAxios
    const [responseData, error, loading, axiosFetch] = useAxios();
    const [formError, setFormError] = useState(null); // Estado para erro de validação do formulário

    // Função para submissão do formulário
    const handleFormSubmit = async (formData) => {
        console.log("Dados recebidos do formulário:", formData);

        // Validação: Verifica se o nome está vazio
        if (!formData.nome || formData.nome.trim() === "") {
            setFormError("O campo 'Nome' é obrigatório.");
            return;
        }

        // Limpa erros anteriores
        setFormError(null);

        try {
            // Faz a requisição POST para registrar o doador
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: "POST",
                url: "/doacoes/registrarDoador",
                data: {
                    nomeCompletoDoador: formData.nome,
                    contatoDoador: formData.contato,
                },
            });
        } catch (err) {
            console.error("Erro ao criar doador:", err);
        }
    };

    console.log("Response:", responseData, "Error:", error);

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Criando Novo Doador"} />
            <FormDoador onSubmitForm={handleFormSubmit} isNew />

            {/* Área de mensagens de status */}
            <div className="pt-3 pb-3">
                {/* Validação do formulário */}
                {formError && (
                    <Alert variant="warning">
                        {formError}
                    </Alert>
                )}

                {/* Mensagem de carregamento */}
                {loading && (
                    <Alert variant="primary">
                        Carregando...
                    </Alert>
                )}

                {/* Mensagem de sucesso */}
                {!loading && !error && responseData.message && (
                    <Alert variant="success">
                        Doador criado com sucesso!
                    </Alert>
                )}

                {/* Mensagem de erro */}
                {!loading && error && (
                    <Alert variant="danger">
                        <b>Erro ao criar doador.</b> Detalhes: <i>{error}</i>
                    </Alert>
                )}
            </div>
        </>
    );
}
