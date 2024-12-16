import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Btn from '../../components/Btn/Btn.jsx';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';
import TitleContent from './../../components/TitleContent/TitleContent';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';

import { Tabs, Tab, Form, FormControl, Alert } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import useAxios from '../../hooks/useAxios.js';
import Loading from '../../components/Loading/Loadings.jsx';

export default function Estoque() {
    const navigate = useNavigate(); // Usando o hook useNavigate
    const [lotesData, error, loading, axiosFetch] = useAxios();
    const [createResponse, createError, createLoading, axiosPost] = useAxios(); // Para o POST
    const [deleteResponse, deleteError, deleteLoading, axiosDelete] = useAxios(); // Para o DELETE
    const [novoLote, setNovoLote] = useState(""); // Estado para o nome do novo lote
    const [selectedLotes, setSelectedLotes] = useState([]); // Estado para os lotes selecionados

    const [alertMessage, setAlertMessage] = useState(""); // Mensagem do alerta
    const [alertVariant, setAlertVariant] = useState(""); // Tipo do alerta (success, danger)

    const [filteredLotes, setFilteredLotes] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc'); // Estado para controlar a ordenação

    useEffect(() => {
        // Carregar os lotes na inicialização
        axiosFetch({
            axiosInstance: axiosInstanceEstoque,
            method: 'GET',
            url: 'estoque/lotes'
        });
    }, []);

    // Função para criar um novo lote
    const handleCreateLote = async () => {
        if (!novoLote.trim()) {
            setAlertMessage("O nome do lote não pode estar vazio!");
            setAlertVariant("warning");
            return;
        }

        await axiosPost({
            axiosInstance: axiosInstanceEstoque,
            method: 'POST',
            url: 'estoque/criarLote',
            data: { nome: novoLote }
        });

        // Após o POST, verifica se deu certo e faz um novo GET
        if (!createError) {
            setAlertMessage("Lote criado com sucesso!");
            setAlertVariant("success");
            setNovoLote(""); // Limpa o input

            axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: 'estoque/lotes'
            });
        } else {
            setAlertMessage("Erro ao criar lote. Tente novamente.");
            setAlertVariant("danger");
            console.error(createError);
        }

        // Apaga o alerta após alguns segundos
        setTimeout(() => {
            setAlertMessage("");
        }, 5000);
    };

    // Função para excluir os lotes selecionados
    const handleDeleteLotes = async () => {
        if (selectedLotes.length === 0) {
            setAlertMessage("Nenhum lote selecionado!");
            setAlertVariant("warning");
            return;
        }

        try {
            for (const loteId of selectedLotes) {
                await axiosDelete({
                    axiosInstance: axiosInstanceEstoque,
                    method: 'DELETE',
                    url: `estoque/lote/${loteId}`,
                });
            }

            setAlertMessage("Lotes excluídos com sucesso!");
            setAlertVariant("success");

            // Recarrega os lotes após a exclusão
            axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: 'estoque/lotes'
            });

            // Limpa a seleção
            setSelectedLotes([]);
        } catch (err) {
            setAlertMessage("Erro ao excluir lotes. Tente novamente.");
            setAlertVariant("danger");
            console.error(deleteError);
        }

        // Apaga o alerta após alguns segundos
        setTimeout(() => {
            setAlertMessage("");
        }, 5000);
    };

    // Mapeando os dados dos lotes
    const lotes = lotesData?.lotes?.map(({ id_lote, id_estoque, nome, quantidade }) => ({
        id: id_lote,
        nome: nome,
        quantidade: quantidade
    }));

    const idsLotes = lotesData?.lotes?.map((lote) => lote.id_lote);

    // Função para lidar com a seleção de lotes
    function handleSelectionChange(selectedIds) {
        console.log("IDs selecionados:", selectedIds);
        setSelectedLotes(selectedIds); // Atualiza os lotes selecionados
    }

    // Função para redirecionar para a página do produto
    function handleRowClick(loteId) {
        navigate(`/estoque/produto/${loteId}`); // Redireciona para a página de produto com o id do lote
    }


    // Filtra a lista baseada na busca
    const handleSearchChange = (searchValue) => {
        const search = searchValue.toLowerCase();
        const filtered = (lotes || []).filter((lote) => {
            const nome = lote.nome?.toLowerCase() || "";

            return (
                nome.includes(search)
            );
        });
        setFilteredLotes(filtered);
    };

    // Ordena a lista baseada no nome
    const handleSortClick = () => {
        const sorted = [...(filteredLotes.length > 0 ? filteredLotes : lotes)].sort((a, b) => {
            if (sortDirection === "asc") {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });

        setFilteredLotes(sorted);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Lotes do Estoque"} />

            {/* Botão, Input e Alerta */}
            <div className='d-flex align-items-center mb-3'>
                <Btn
                    text={createLoading ? "Criando..." : "Novo Lote"}
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleCreateLote}
                    disabled={createLoading}
                />
                <Form className="d-flex w-25">
                    <FormControl
                        type="text"
                        placeholder="Digite o nome do lote"
                        className="ms-2 me-2 mb-4"
                        aria-label="Nome do lote"
                        value={novoLote}
                        onChange={(e) => setNovoLote(e.target.value)}
                    />
                </Form>
            </div>

            {/* Exibe o Alerta */}
            {alertMessage && (
                <Alert variant={alertVariant} className="w-50">
                    {alertMessage}
                </Alert>
            )}
            <TableToolbar
                onSearchChange={handleSearchChange}
                onSortClick={handleSortClick}
            />
            {/* Botão de Exclusão */}
            <Btn
                variant={"danger"}
                text={deleteLoading ? "Excluindo aguarde..." : "Excluir Lotes Selecionados"}
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteLotes}
            />

            <TableComponent
                rowIds={(filteredLotes.length > 0 ? filteredLotes : lotes)?.map((lote) => lote.id)}
                items={filteredLotes.length > 0 ? filteredLotes : lotes}
                onSelectionChange={handleSelectionChange}
                onRowClick={handleRowClick} // Alterado aqui para lidar com o clique na linha
            />
        </>
    );
}
