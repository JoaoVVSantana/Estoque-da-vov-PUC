import { useState } from 'react';
import FormProduto from '../../components/FormProduto/FormProduto.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import useAxios from '../../hooks/useAxios.js';
import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';

export default function NovoProduto() {
    const { idLote } = useParams(); // Obtém o id do lote da URL
    const [responseData, error, loading, axiosFetch] = useAxios(); // Hook de requisição
    const [responseDoacao, errorDoacao, loadingDoacao, axiosFetchDoacao] = useAxios(); // Hook separado para doação
    const [errorMessage, setErrorMessage] = useState(null);

    console.log("id:", idLote);

    // Função de submissão do formulário
    const handleFormSubmit = async (data) => {
        console.log("data recebida:", data);

        // Validação da quantidade
        if (!data.quantidade || data.quantidade <= 0) {
            setErrorMessage("A quantidade deve ser maior que 0 para prosseguir.");
            return;
        }else{
            setErrorMessage(null);
        }

        try {
            if (data.doador && data.doador.trim() !== "") {
                // Se houver doador, faz a requisição para registrar doação
                console.log("Enviando dados como doação...");
                await axiosFetchDoacao({
                    axiosInstance: axiosInstanceEstoque,
                    method: 'POST',
                    url: 'doacoes/registrarDoacao',
                    data: {
                        nomeCompletoDoador: data.doador,
                        nomeItem: data.nome,
                        validade: data.validade,
                        tipo: data.categoria,
                        quantidade: data.quantidade,
                        id_lote: idLote,
                    },
                });
            } else {
                // Se não houver doador, usa a requisição padrão
                console.log("Enviando dados como item normal...");
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: 'POST',
                    url: 'estoque/inserirItem',
                    data: {
                        nome: data.nome,
                        validade: data.validade,
                        tipo: data.categoria,
                        quantidade: data.quantidade,
                        id_lote: idLote,
                    },
                });
            }
        } catch (err) {
            console.error("Erro na submissão:", err);
        }
    };

    console.log("RES-Item:", responseData, error);
    console.log("RES-Doacao:", responseDoacao, errorDoacao);

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Criando Novo Produto"} />
            <FormProduto onSubmitForm={handleFormSubmit} isNew />

            <div className='pt-3 pb-3'>
                {/* Alerta de sucesso ou erro para a inserção de produto */}
                {!loading && !error && responseData.message && (
                    <Alert variant={"success"}>Produto inserido com sucesso</Alert>
                )}
                {!loadingDoacao && !errorDoacao && responseDoacao.message && (
                    <Alert variant={"success"}>Doação registrada com sucesso</Alert>
                )}

                {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                        {errorMessage}
                    </Alert>
                )}

                {loading || loadingDoacao ? (
                    <Alert variant={"primary"}>Carregando...</Alert>
                ) : null}

                {!loading && error && (
                    <Alert variant={"danger"}>
                        <b>Erro ao criar produto na base de dados.</b> Código do erro: <i>{error}</i>
                    </Alert>
                )}

                {!loadingDoacao && errorDoacao && (
                    <Alert variant={"danger"}>
                        <b>Erro ao registrar doação.</b> Código do erro: <i>{errorDoacao}</i>
                    </Alert>
                )}
            </div>
        </>
    );
}
