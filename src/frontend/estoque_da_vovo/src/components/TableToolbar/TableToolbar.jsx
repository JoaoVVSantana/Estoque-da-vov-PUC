import React from 'react';
import { Navbar, Form, FormControl, ButtonGroup, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarDays, faFilter } from "@fortawesome/free-solid-svg-icons";

import './TableToolbar.css'

export default function TableToolbar() {
  return (
    <Navbar  expand="lg" className="toolbar mb-3">
      <Container fluid>
        <Form className="d-flex w-25">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
          />
        </Form>
        <ButtonGroup className='btn-group'>
          <Button variant="link">
            <FontAwesomeIcon icon={faSort} /> Ordenar
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faCalendarDays} /> Data
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faFilter} /> Filtros
          </Button>
        </ButtonGroup>
      </Container>
    </Navbar>
  );
}

