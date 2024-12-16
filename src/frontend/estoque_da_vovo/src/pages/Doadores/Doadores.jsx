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

import Alert from "react-bootstrap/Alert"; // Importação do Alert

export default function Doadores() {
    const navigate = useNavigate();
    const [doadores, error, loading, axiosFetch] = useAxios();
    const [selectedDoadores, setSelectedDoadores] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState(null);

    const [filteredDoadores, setFilteredDoadores] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc'); // Estado para controlar a ordenação

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

    // Atualiza a lista de doadores processados
    const processedDoadores = doadores
        ? doadores.map((doador) => ({
            id: doador.id_doador,
            nome: doador.nome,
            contato: doador.contato,
            quantidadeItensDoados: doador.quantidadeItensDoados,
        }))
        : [];

    // Filtra a lista baseada na busca
    const handleSearchChange = (searchValue) => {
        const search = searchValue.toLowerCase();
        const filtered = (processedDoadores || []).filter((doador) => {
            const nome = doador.nome?.toLowerCase() || "";
            const contato = doador.contato?.toLowerCase() || "";

            return (
                nome.includes(search) ||
                contato.includes(search)
            );
        });
        setFilteredDoadores(filtered);
    };

    // Ordena a lista baseada no nome
    const handleSortClick = () => {
        const sorted = [...(filteredDoadores.length > 0 ? filteredDoadores : processedDoadores)].sort((a, b) => {
            if (sortDirection === "asc") {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });

        setFilteredDoadores(sorted);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleRowClick = (dataId) => {
        navigate(`/doadores/alterar-doador/${dataId}`);
    };

    const handleClick = () => {
        navigate("/doadores/novo-doador");
    };

    function handleSelectionChange(selectedIds) {
        setSelectedDoadores(selectedIds);
    }

    const handleDeleteSelected = async () => {
        if (selectedDoadores.length === 0) {
            setAlertInfo({ variant: "warning", message: "Selecione ao menos um doador para excluir." });
            return;
        }

        setDeleteLoading(true);

        try {
            for (const doadorId of selectedDoadores) {
                await axiosFetch({
                    axiosInstance: axiosInstanceEstoque,
                    method: "DELETE",
                    url: `doacoes/${doadorId}/apagarDoador`,
                });
            }

            setSelectedDoadores([]);
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque,
                method: "GET",
                url: "doacoes/doadores",
            });

            setAlertInfo({ variant: "success", message: "Doadores excluídos com sucesso." });
        } catch (err) {
            console.error("Erro ao excluir doador:", err);
            setAlertInfo({ variant: "danger", message: "Erro ao excluir doadores. Tente novamente." });
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Doadores"} />

            {alertInfo && (
                <Alert variant={alertInfo.variant} onClose={() => setAlertInfo(null)} dismissible>
                    {alertInfo.message}
                </Alert>
            )}

            <Btn
                text={"Novo Doador"}
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleClick}
            />

            <TableToolbar
                onSearchChange={handleSearchChange}
                onSortClick={handleSortClick}
            />

            <Btn
                variant={"danger"}
                text={deleteLoading ? "Excluindo aguarde..." : "Excluir Doadores Selecionados"}
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteSelected}
                disabled={deleteLoading || selectedDoadores.length === 0}
            />

            {loading ? (
                <Loading />
            ) : (
                <TableComponent
                    rowIds={(filteredDoadores.length > 0 ? filteredDoadores : processedDoadores)?.map((doador) => doador.id)}
                    items={filteredDoadores.length > 0 ? filteredDoadores : processedDoadores}
                    onSelectionChange={handleSelectionChange}
                    onRowClick={handleRowClick}
                />
            )}
        </>
    );
}
