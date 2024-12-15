import React from 'react';
import { Navbar, Form, FormControl, ButtonGroup, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarDays, faFilter } from "@fortawesome/free-solid-svg-icons";

import './TableToolbar.css';

export default function TableToolbar({ onSearchChange, onSortClick }) {

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão (recarregar a página)
  };

  return (
    <Navbar expand="lg" className="toolbar mb-3">
      <Container fluid>
        <Form className="d-flex form-bar" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Form>

        <ButtonGroup className='btn-group'>
          <Button variant="link" onClick={() => onSortClick()}>
            <FontAwesomeIcon icon={faSort} /> Ordenar
          </Button>
          {/*
          <Button variant="link">
            <FontAwesomeIcon icon={faCalendarDays} /> Data
          </Button>
          */}
          {/*
          <Button variant="link">
            <FontAwesomeIcon icon={faFilter} /> Filtros
          </Button>*/}
        </ButtonGroup>
      </Container>
    </Navbar>
  );
}





