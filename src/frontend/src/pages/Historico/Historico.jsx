import { useEffect, useState } from 'react';
import { Alert, Tabs, Tab, Container } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios'; 
import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import BreadCrumbNav from '../../components/BreadCrumbNav/BreadCrumbNav.jsx'; 
import TitleContent from '../../components/TitleContent/TitleContent.jsx'; 
import TableComponent from './../../components/TableComponent/TableComponent.jsx';
import Loading from '../../components/Loading/Loadings.jsx';


export default function Historico() {
    const [historico, setHistorico] = useState([]);
    const [historicoMesAtual, setHistoricoMesAtual] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [loading, setLoading] = useState(true);

    const [response, error, loadingRequest, axiosFetch] = useAxios();  

    // Função para buscar os históricos completos
    const fetchHistorico = async () => {
        try {
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque, // Usando axiosInstanceEstoque
                method: 'GET',
                url: '/alteracoes/historico',
            });
        } catch (err) {
            setAlertMessage("Erro ao carregar o histórico completo.");
            setAlertVariant("danger");
            console.error(err);
        }
    };

    // Função para buscar o histórico do mês atual
    const fetchHistoricoMesAtual = async () => {
        try {
            await axiosFetch({
                axiosInstance: axiosInstanceEstoque, // Usando axiosInstanceEstoque
                method: 'GET',
                url: '/alteracoes/historicoMesAtual',
            });
        } catch (err) {
            setAlertMessage("Erro ao carregar o histórico do mês atual.");
            setAlertVariant("danger");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHistorico();
        fetchHistoricoMesAtual();
    }, []);

    useEffect(() => {
        // Atualizando os dados de histórico conforme a resposta da requisição
        if (response.length > 0) {
            setHistorico(response);
            setHistoricoMesAtual(response);  // Assumindo que os dados retornados são os mesmos para o mês atual
        }
    }, [response]);

    // Função para formatar a data
    const formatarData = (data) => {
        const date = new Date(data);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    // Função para obter dados da tabela
    const getTableData = (dados) => {
        return dados.map((alteracao) => ({
            id: alteracao.id_alteracao,
            descricao: alteracao.descricao,
            data_alteracao: formatarData(alteracao.data_alteracao),
            tipo: alteracao.tipo,
            id_item: alteracao.id_item,
        }));
    };

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Histórico"} />
            
            {alertMessage && (
                <Alert variant={alertVariant} className="w-50">
                    {alertMessage}
                </Alert>
            )}

                <Tabs defaultActiveKey="todos" id="historico-tabs">
                    <Tab eventKey="todos" title="Histórico Completo">
                        {loadingRequest ? (
                            <Loading/>
                        ) : (
                            <TableComponent
                                noSelect
                                rowIds={historico.map(item => item.id_alteracao)}
                                items={getTableData(historico)}
                                onSelectionChange={(selectedIds) => console.log(selectedIds)}
                                onRowClick={(id) => console.log("Alteração clicada", id)}
                            />
                        )}
                    </Tab>

                    <Tab eventKey="mesAtual" title="Histórico do Mês Atual">
                        {loadingRequest ? (
                            <Loading/>
                        ) : (
                            <TableComponent
                                noSelect
                                rowIds={historicoMesAtual.map(item => item.id_alteracao)}
                                items={getTableData(historicoMesAtual)}
                                onSelectionChange={(selectedIds) => console.log(selectedIds)}
                                onRowClick={(id) => console.log("Alteração clicada", id)}
                            />
                        )}
                    </Tab>
                </Tabs>
        </>
    );
}
