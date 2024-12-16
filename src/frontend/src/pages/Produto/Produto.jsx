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
    const { id } = useParams();
    const navigate = useNavigate();

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [selectedItens, setSelectedItens] = useState([]);
    const [itens, error, loading, axiosFetch] = useAxios();
    const [doadores, setDoadores] = useState([]); // Estado para lista de doadores

    const [filteredItens, setFilteredItens] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc'); // Estado para controlar a ordenação
    const [currentTab, setCurrentTab] = useState("todos"); // Estado para controlar a aba ativa

    // Função para buscar os doadores
    const fetchDoadores = async () => {
        try {
            const response = await axiosInstanceEstoque.get('doacoes/doadores');
            setDoadores(response.data);
        } catch (error) {
            console.error("Erro ao buscar doadores:", error);
        }
    };

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
            fetchDoadores(); // Carrega os doadores
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
            setSelectedItens([]);

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

        setTimeout(() => setAlertMessage(""), 5000);
    };

    // Redireciona para a página de Novo Produto
    const handleNewProduct = () => {
        navigate(`/estoque/novo-produto/${id}`);
    };

    // Relaciona os itens com os nomes dos doadores
    const processedItens = itens?.itens?.map((item) => {
        const doador = doadores.find((d) => d.id_doador === item.id_doador);
        return {
            id_item: item.id_item,
            nome: item.nome,
            validade: item.validade,
            tipo: item.tipo,
            doador_nome: doador ? doador.nome : "Sem Doador", // Relaciona o nome
        };
    });

    // Filtra os itens que possuem doador
    const itensComDoador = processedItens?.filter((item) => item.doador_nome !== "Sem Doador");

    // Função de busca genérica
    const handleSearchChange = (searchValue) => {
        const search = searchValue.toLowerCase();
        if (currentTab === "todos") {
            // Filtra todos os itens
            const filtered = processedItens.filter((item) => {
                const nome = item.nome?.toLowerCase() || "";
                const tipo = item.tipo?.toLowerCase() || "";
                const doador_nome = item.doador_nome?.toLowerCase() || "";

                return (
                    nome.includes(search) ||
                    tipo.includes(search) ||
                    doador_nome.includes(search)
                );
            });
            setFilteredItens(filtered);
        } else if (currentTab === "doacoes") {
            // Filtra os itens com doador
            const filtered = itensComDoador.filter((item) => {
                const nome = item.nome?.toLowerCase() || "";
                const tipo = item.tipo?.toLowerCase() || "";
                const doador_nome = item.doador_nome?.toLowerCase() || "";

                return (
                    nome.includes(search) ||
                    tipo.includes(search) ||
                    doador_nome.includes(search)
                );
            });
            setFilteredItens(filtered);
        }
    };

    // Ordena a lista baseada no nome
    const handleSortClick = () => {
        const sorted = [...(filteredItens.length > 0 ? filteredItens : processedItens)].sort((a, b) => {
            if (sortDirection === "asc") {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });

        setFilteredItens(sorted);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    // Função para mudar a aba ativa
    const handleTabSelect = (key) => {
        setCurrentTab(key); // Muda o estado da aba ativa
        setFilteredItens([]); // Limpa os itens filtrados ao trocar de aba
    };

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Produtos de um Lote Específico"} />

            {alertMessage && (
                <Alert variant={alertVariant} className="w-50">
                    {alertMessage}
                </Alert>
            )}

            <Btn
                text="Novo Produto"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleNewProduct}
                disabled={false}
            />

            <TableToolbar
                onSearchChange={handleSearchChange} // Usa a mesma função de busca, mas verifica a aba
                onSortClick={handleSortClick}
            />

            <Btn
                variant={"danger"}
                text="Excluir Itens Selecionados"
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteItens}
            />
            <Tabs
                defaultActiveKey="todos"
                id="table-tabs"
                className="mb-3"
                onSelect={handleTabSelect} // Define a função para alternar entre as abas
            >
                <Tab eventKey="todos" title="Todos">
                    <TableComponent
                        rowIds={(filteredItens.length > 0 ? filteredItens : processedItens)?.map((item) => item.id_item)}
                        items={filteredItens.length > 0 ? filteredItens : processedItens}
                        onSelectionChange={(selectedIds) => setSelectedItens(selectedIds)}
                        onRowClick={(id) => console.log("Item clicado", id)}
                    />
                </Tab>

                <Tab eventKey="doacoes" title="Doações">
                    <TableComponent
                        rowIds={(filteredItens.length > 0 ? filteredItens : itensComDoador)?.map((item) => item.id_item)}
                        items={filteredItens.length > 0 ? filteredItens : itensComDoador}
                        onSelectionChange={(selectedIds) => setSelectedItens(selectedIds)}
                        onRowClick={(id) => console.log("Item com doador clicado", id)}
                    />
                </Tab>
            </Tabs>

            {loading && <Loading />}
        </>
    );
}
