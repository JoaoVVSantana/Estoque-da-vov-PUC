import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import useAxios from '../../hooks/useAxios.js';
import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';
import Btn from '../../components/Btn/Btn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import Loading from '../../components/Loading/Loadings.jsx';

export default function Produto() {
    const { id } = useParams(); // Obtém o id do lote da URL
    const navigate = useNavigate(); // Hook para navegação
    const [alertMessage, setAlertMessage] = useState(""); // Para exibir alertas
    const [alertVariant, setAlertVariant] = useState(""); // Tipo do alerta (success, danger)
    const [selectedItens, setSelectedItens] = useState([]); // Itens selecionados na tabela
    const [itens, error, loading, axiosFetch] = useAxios(); // Hook personalizado para requisições

    // Busca os itens do lote ao montar o componente ou quando o ID muda
    useEffect(() => {
        const fetchItens = async () => {
            try {
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: 'GET',
                    url: `estoque/lotes/${id}/itens`,
                });
            } catch (err) {
                setAlertMessage("Erro ao carregar os itens. Tente novamente.");
                setAlertVariant("danger");
                console.error(err);
            }
        };

        if (id) {
            fetchItens();
        }
    }, [id]);

    // Função para excluir os itens selecionados
    const handleDeleteItens = async () => {
        if (selectedItens.length === 0) {
            setAlertMessage("Nenhum item selecionado!");
            setAlertVariant("warning");
            return;
        }

        try {
            for (const itemId of selectedItens) {
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: 'POST',
                    url: `estoque/retirarItem`,
                    data: { id_item: itemId },
                });
            }

            setAlertMessage("Itens retirados com sucesso!");
            setAlertVariant("success");
            setSelectedItens([]); // Limpa a seleção

            // Recarrega os itens
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: `estoque/lotes/${id}/itens`,
            });
        } catch (err) {
            setAlertMessage("Erro ao retirar itens. Tente novamente.");
            setAlertVariant("danger");
            console.error(err);
        }

        setTimeout(() => setAlertMessage(""), 5000); // Limpa o alerta após 5 segundos
    };

    // Redireciona para a página de Novo Produto
    const handleNewProduct = () => {
        navigate(`/estoque/novo-produto/${id}`); // Redireciona com o id do lote
    };

    // Manipula os dados dos itens para exibir na tabela
    const processedItens = itens?.itens?.map((item) => ({
        id_item: item.id_item,
        nome: item.nome,
        validade: item.validade,
        tipo: item.tipo,
        id_doador: item.id_doador
    }));

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Produto"} />

            {/* Exibe Alerta */}
            {alertMessage && (
                <Alert variant={alertVariant} className="w-50">
                    {alertMessage}
                </Alert>
            )}

            {/* Botão Novo Produto */}
            <Btn
                text="Novo Produto"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleNewProduct} // Chama a função de redirecionamento
                disabled={false}
            />

            <TableToolbar />

            {/* Tabs para exibir os itens */}
            <Tabs defaultActiveKey="todos" id="table-tabs" className="mb-3">
                <Tab eventKey="todos" title="Todos">
                    {/* Botão de Exclusão */}
                    <Btn
                        text="Excluir Itens Selecionados"
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={handleDeleteItens} // Chama a função de exclusão
                    />

                    {/* Tabela de Itens */}
                    <TableComponent
                        rowIds={processedItens?.map((item) => item.id_item)}
                        items={processedItens}
                        onSelectionChange={(selectedIds) =>
                            setSelectedItens(selectedIds)
                        }
                        onRowClick={(id) => console.log("Item clicado", id)}
                    />
                </Tab>
            </Tabs>

            {/* Loading enquanto carrega os dados */}
            {loading && <Loading />}
        </>
    );
}
