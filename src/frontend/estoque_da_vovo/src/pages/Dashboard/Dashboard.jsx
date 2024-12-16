import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import BreadCrumbNav from '../../components/BreadCrumbNav/BreadCrumbNav.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import DashboardCard from './DashboardCard/DashBoardCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faTriangleExclamation, faGift } from "@fortawesome/free-solid-svg-icons";
import BarChart from './BarChart/BarChart.jsx';
import PieChart from './PieChart/PieChart.jsx';
import Loading from './../../components/Loading/Loadings';
import useAxios from '../../hooks/useAxios';
import { axiosInstanceEstoque } from '../../services/axiosInstance';

export default function Dashboard() {
    const [totalItens, setTotalItens] = useState(0);
    const [totalDoacoes, setTotalDoacoes] = useState(0);
    const [itensVencidosCount, setItensVencidosCount] = useState(0);
    const [itensValidadeProximaCount, setItensValidadeProximaCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Hook useAxios
    const [responseItens, errorItem, loadingItens, axiosFetchItens] = useAxios();
    const [responseDoacoes, errorDoacoes, loadingDoacoes, axiosFetchDoacoes] = useAxios();
    const [responseVencidos, errorVencidos, loadingVencidos, axiosFetchVencidos] = useAxios();
    const [responseValidadeProxima, errorValidadeProxima, loadingValidadeProxima, axiosFetchValidadeProxima] = useAxios();
    const [responseDoadores, errorDoadores, loadingDoadores, axiosFetchDoadores] = useAxios();

    // Função para buscar dados do dashboard
    const fetchDashboardData = async () => {
        setIsLoading(true); // Ativa o carregamento
        try {
            // Requisição itens perto do vencimento
            await axiosFetchValidadeProxima({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/item/itensPertoDoVencimento',
            });

            // Requisição itens vencidos
            await axiosFetchVencidos({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/item/itensVencidos',
            });

            //Requisição Doadores
            await axiosFetchDoadores({
                axiosInstance: axiosInstanceEstoque,
                method: "GET",
                url: "doacoes/doadores",
            });

            // Requisição total de itens no estoque
            await axiosFetchItens({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/estoque/listarItens',
            });

            // Requisição total de doações
            await axiosFetchDoacoes({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/doacoes/todosItensDeDoacoes',
            });

        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);
        } finally {
            setIsLoading(false); // Desativa o carregamento
        }
    };

    // useEffect para buscar dados ao carregar o componente
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Atualiza estados após as respostas
    useEffect(() => {
        if (responseItens?.itens) {
            setTotalItens(responseItens.itens.length);
        }

        if (responseDoacoes?.itens) {
            setTotalDoacoes(responseDoacoes.itens.length);
        }

        if (responseValidadeProxima?.alertas) {
            setItensValidadeProximaCount(responseValidadeProxima.alertas.length);
        }

        if (responseVencidos?.alertas) {
            setItensVencidosCount(responseVencidos.alertas.length);
        }
    }, [responseItens, responseDoacoes, responseValidadeProxima, responseVencidos]);
    if (isLoading || loadingItens || loadingDoacoes || loadingValidadeProxima || loadingVencidos) {
        return <Loading />;
    } else {


        return (
            <>
                <BreadCrumbNav />
                <TitleContent title={"Dashboard"} />
                <Row className="g-4">

                    {/* Total de Itens */}
                    <Col sm={12} md={6} lg={3}>
                        <DashboardCard
                            title="Total de Produtos"
                            value={`${totalItens} Itens`}
                            colorClass={"card-var1"}
                            icon={<FontAwesomeIcon icon={faBoxesStacked} />}
                        />
                    </Col>

                    {/* Validade Próxima */}
                    <Col sm={12} md={6} lg={3}>
                        <DashboardCard
                            title="Validade Próxima"
                            value={`${itensValidadeProximaCount} Itens`}
                            colorClass={"card-var2"}
                            icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
                        />
                    </Col>

                    {/* Total de Doações */}
                    <Col sm={12} md={6} lg={3}>
                        <DashboardCard
                            title="Total de Doações"
                            value={`${totalDoacoes} Doações`}
                            colorClass={"card-var1"}
                            icon={<FontAwesomeIcon icon={faGift} />}
                        />
                    </Col>

                    {/* Itens Vencidos */}
                    <Col sm={12} md={6} lg={3}>
                        <DashboardCard
                            title="Itens Vencidos"
                            value={`${itensVencidosCount} Itens`}
                            colorClass={"card-var2"}
                            icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
                        />
                    </Col>

                </Row>

                {/* Gráficos */}
                <Row className="g-4 mt-5">
                    <Col sm={12} md={6} lg={6}>
                        <div className='bg-white p-3 rounded'>
                            {responseItens?.itens ? <BarChart itensGeral={responseDoacoes?.itens || []} /> : ""}
                            
                        </div>
                    </Col>

                    <Col sm={12} md={6} lg={6}>
                        <div className='bg-white p-3 rounded'>
                            {responseDoadores ? <PieChart doadores={responseDoadores || []} /> : ""}

                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}
