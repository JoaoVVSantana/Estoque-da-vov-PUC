import BreadCrumbNav from "../../components/BreadCrumbNav/BreadCrumbNav.jsx";
import Btn from "../../components/Btn/Btn.jsx";
import TitleContent from "../../components/TitleContent/TitleContent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import TableToolbar from "../../components/TableToolbar/TableToolbar.jsx";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { axiosInstanceEstoque } from "../../services/axiosInstance.js";
import useAxios from "../../hooks/useAxios.js";
import Loading from "../../components/Loading/Loadings.jsx";

export default function Doadores() {
    const navigate = useNavigate();
    const [doadores, error, loading, axiosFetch] = useAxios(); // Hook useAxios
    const [selectedDoadores, setSelectedDoadores] = useState([]); // IDs selecionados
    const [deleteLoading, setDeleteLoading] = useState(false); // Estado para controlar o loading da exclusão

    // Requisição GET para buscar lista de doadores
    useEffect(() => {
        const fetchDoadores = async () => {
            try {
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: "GET",
                    url: "doacoes/doadores",
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchDoadores();
    }, []);

    // Redireciona para a página de cadastro de novo doador
    const handleClick = () => {
        navigate("/doadores/novo-doador");
    };

    // Manipula a seleção de linhas na tabela
    function handleSelectionChange(selectedIds) {
        console.log("IDs selecionados:", selectedIds);
        setSelectedDoadores(selectedIds);
    }

    // Formata os dados da lista de doadores para exibição na tabela
    const processedDoadores = doadores?.map((doador) => ({
        id: doador.id_doador,
        nome: doador.nome,
        email: doador.email,
        quantidadeItensDoados: doador.quantidadeItensDoados,
    }));

    // Função para excluir os doadores selecionados
    const handleDeleteSelected = async () => {
        if (selectedDoadores.length === 0) {
            alert("Selecione ao menos um doador para excluir.");
            return;
        }

        setDeleteLoading(true); // Inicia o loading

        try {
            // Envia a requisição DELETE para cada doador selecionado
            for (const doadorId of selectedDoadores) {
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: "DELETE",
                    url: `doacoes/${doadorId}/apagarDoador`,
                });
            }

            // Após exclusão, limpa a seleção e recarrega a lista de doadores
            setSelectedDoadores([]);
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: "GET",
                url: "doacoes/doadores",
            });

            alert("Doadores excluídos com sucesso.");
        } catch (err) {
            console.error("Erro ao excluir doador:", err);
            alert("Erro ao excluir doadores.");
        } finally {
            setDeleteLoading(false); // Fim do loading
        }
    };

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Doadores"} />

            {/* Botão Novo Doador */}
            <Btn
                text={"Novo Doador"}
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleClick}
            />

            {/* Toolbar */}
            <TableToolbar />

            {/* Botão de Exclusão */}
            <Btn
                text={deleteLoading ? "Excluindo aguarde..." : "Excluir Doadores Selecionados"}
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteSelected}
                disabled={deleteLoading || selectedDoadores.length === 0}
            />

            {/* Tabela de Doadores */}
            {loading ? (
                <Loading />
            ) : (
                <TableComponent
                    rowIds={processedDoadores?.map((doador) => doador.id)}
                    items={processedDoadores}
                    onSelectionChange={handleSelectionChange}
                />
            )}
        </>
    );
}
