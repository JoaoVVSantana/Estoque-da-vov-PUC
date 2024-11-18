import React from 'react';
import { Card } from 'react-bootstrap';

import './DashBoardCard.css'


const DashboardCard = ({ title, value, colorClass, icon }) => {
    return (
        <Card className={`${colorClass} d-flex`}>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column text-left">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{value}</Card.Text>
                </div>
                <div className="icon-container d-flex justify-content-between align-items-center">{icon}</div>
            </Card.Body>
        </Card>
    );
};

export default DashboardCard;
