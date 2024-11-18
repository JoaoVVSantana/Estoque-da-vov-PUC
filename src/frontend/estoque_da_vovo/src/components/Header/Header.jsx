import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton, NavDropdown, Container, Row, Col, Button, NavItem } from 'react-bootstrap';
import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import BtnNotification from './../BtnNotification/BtnNotification';

//TESTE DE NOTIFICAÇÕES
const notifications = [
    { time: '2 mins ago', message: ' "Feijão" com validade do proxima do vencimento 22/11' },
    { time: '10 mins ago', message: '"Leite" em falta no estoque' },
    { time: '1 hour ago', message: '"Arroz" em falta no estoque' },
];

export default function Header() {
    return (
        // bg="dark" variant="dark"
        <Navbar expand="lg" className="header pe-4 ps-5">
            <Navbar.Brand>Estoque da Vovó</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#home"><BtnNotification notifications={notifications} /></Nav.Link>
                    <Nav.Link href="#link"><FontAwesomeIcon icon={faGear} /></Nav.Link>
                    <DropdownButton variant='none' id="dropdown-basic-button" align={'end'} title={<FontAwesomeIcon icon={faCircleUser} />} >
                        <Dropdown.Item href="#/action-1">Sua Conta</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">Sair da Conta</Dropdown.Item>
                    </DropdownButton>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}