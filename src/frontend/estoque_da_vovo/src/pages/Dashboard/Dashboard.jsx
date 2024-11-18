import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BreadCrumbNav from '../../components/BreadCrumbNav/BreadCrumbNav.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import DashboardCard from './DashboardCard/DashBoardCard.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faTriangleExclamation, faPills, faGift } from "@fortawesome/free-solid-svg-icons";

import BarChart from './BarChart/BarChart.jsx';
import PieChart from './PieChart/PieChart.jsx';

export default function Dashboard() {
    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Dashboard"} />
            <Row className="g-4">

                <Col sm={12} md={6} lg={3}>
                    <DashboardCard
                        title="Total de Itens"
                        value="250 Itens"
                        colorClass={"card-var1"}
                        icon={<FontAwesomeIcon icon={faBoxesStacked} />}
                    />
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <DashboardCard
                        title="Validade Próxima"
                        value="15 Itens"
                        colorClass={"card-var2"}
                        icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
                    />
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <DashboardCard
                        title="Doações Pendentes"
                        value="5 Doações"
                        colorClass={"card-var1"}
                        icon={<FontAwesomeIcon icon={faGift} />}
                    />
                </Col>

                <Col sm={12} md={6} lg={3}>
                    <DashboardCard
                        title="Medicamentos"
                        value="80 Medicamentos"
                        colorClass={"card-var2"}
                        icon={<FontAwesomeIcon icon={faPills} />}
                    />
                </Col>

            </Row>

            <Row className="g-4 mt-5">
                <Col sm={12} md={6} lg={6}>
                    <div className='bg-white p-3 rounded'>
                        <BarChart />
                    </div>
                </Col>

                <Col sm={12} md={6} lg={6}>
                    <div className='bg-white p-3 rounded'>
                    <PieChart />
                    </div>
                </Col>
            </Row>
        </>
    );
}
