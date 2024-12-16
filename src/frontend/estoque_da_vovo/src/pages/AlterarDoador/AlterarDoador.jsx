import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BreadCrumbNav from "../../components/BreadCrumbNav/BreadCrumbNav.jsx";
import TitleContent from "../../components/TitleContent/TitleContent.jsx";
import FormDoador from "../NovoDoador/FormDoador/FormDoador.jsx";
import Alert from "react-bootstrap/Alert";

import { axiosInstanceEstoque } from "../../services/axiosInstance.js";
import useAxios from "../../hooks/useAxios.js";

export default function AlterarDoador() {
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o ID do doador da URL
    const [doador, setDoador] = useState(null); // Estado para armazenar os dados do doador
    const [formError, setFormError] = useState(null); // Estado para erro de validação do formulário
    const [alertInfo, setAlertInfo] = useState(null); // Estado para alertas

    // Estados do hook useAxios
    const [responseData, error, loading, axiosFetch] = useAxios();

    // Busca as informações do doador pelo ID ao carregar a página
    useEffect(() => {
        const fetchDoador = async () => {
            try {
                const response = await axiosInstanceEstoque.get(`/doacoes/${id}/doador`);
                setDoador(response.data.doador);
            } catch (err) {
                console.error("Erro ao buscar dados do doador:", err);
                setAlertInfo({ variant: "danger", message: "Erro ao carregar os dados do doador." });
            }
        };

        fetchDoador();
    }, [id]);

    // Função para submissão do formulário
    const handleFormSubmit = async (formData) => {
        console.log("Dados recebidos do formulário:", formData);

        // Validação: Verifica se o campo nome está vazio
        if (!formData.nome || formData.nome.trim() === "") {
            setFormError("O campo 'Nome' é obrigatório.");
            return;
        }

        // Limpa erros anteriores
        setFormError(null);
        setAlertInfo(null);

        try {
            // Faz a requisição PUT para atualizar o doador
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: "PUT",
                url: `/doacoes/${id}/atualizarDoador`,
                data: {
                    nome: formData.nome,
                    contato: formData.contato,
                },
            });

            setAlertInfo({ variant: "success", message: "Doador atualizado com sucesso!" });

            // Redireciona após 2 segundos
            setTimeout(() => navigate("/doadores"), 2000);
        } catch (err) {
            console.error("Erro ao atualizar doador:", err);
            setAlertInfo({ variant: "danger", message: "Erro ao atualizar o doador. Tente novamente." });
        }
    };

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Alterando Dados do Doador"} />

            {/* Área de mensagens de status */}
            <div className="pt-3 pb-3">
                {/* Alerta principal */}
                {alertInfo && (
                    <Alert variant={alertInfo.variant} dismissible onClose={() => setAlertInfo(null)}>
                        {alertInfo.message}
                    </Alert>
                )}

                {/* Mensagem de carregamento */}
                {loading && (
                    <Alert variant="primary">
                        Carregando...
                    </Alert>
                )}

                {/* Validação do formulário */}
                {formError && (
                    <Alert variant="warning">
                        {formError}
                    </Alert>
                )}
            </div>

            {/* Carrega o formulário apenas se os dados do doador foram carregados */}
            {doador ? (
                <FormDoador
                    isNew={false} 
                    initialData={{
                        nome: doador.nome,       // Dados carregados do backend
                        contato: doador.contato,
                    }}
                    onSubmitForm={handleFormSubmit}
                />
            ) : (
                <Alert variant="info">Carregando informações do doador...</Alert>
            )}
        </>
    );
}
