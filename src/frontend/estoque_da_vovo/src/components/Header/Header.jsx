import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton, NavDropdown, Container, Row, Col, Button, NavItem } from 'react-bootstrap';
import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleUser, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import BtnNotification from './../BtnNotification/BtnNotification';

import { useAuth } from '../../context/AuthContext.jsx';

//TESTE DE NOTIFICAÇÕES
const notifications = [
    { time: '2 mins ago', message: ' "Feijão" com validade do proxima do vencimento 22/11' },
    { time: '10 mins ago', message: '"Leite" em falta no estoque' },
    { time: '1 hour ago', message: '"Arroz" em falta no estoque' },
];

export default function Header({ expanded, toggleSidebar }) {
    const { logout } = useAuth();
    return (
        // bg="dark" variant="dark"
        <Navbar expand="lg" className="header pe-4 ps-5">
            <div className='area-btn'>
                <Button variant="primary" onClick={toggleSidebar} className="rounded-circle ">
                    {expanded ? <FontAwesomeIcon icon={faAnglesLeft} /> : <FontAwesomeIcon icon={faAnglesRight} />}
                </Button>
            </div>
            <Navbar.Brand>Estoque da Vovó</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link><BtnNotification notifications={notifications} /></Nav.Link>
                    <Nav.Link><FontAwesomeIcon icon={faGear} /></Nav.Link>
                    <DropdownButton variant='none' id="dropdown-basic-button" align={'end'} title={<FontAwesomeIcon icon={faCircleUser} />} >
                        {//<Dropdown.Item href="#/action-1">Sua Conta</Dropdown.Item>
                            //
                            //<Dropdown.Divider />
                        }
                        <Dropdown.Item onClick={logout}>Sair da Conta</Dropdown.Item>
                    </DropdownButton>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}