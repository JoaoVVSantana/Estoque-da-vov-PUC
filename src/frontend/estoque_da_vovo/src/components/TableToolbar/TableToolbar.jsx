import React from 'react';
import { InputGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarDays, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function TableToolbar() {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Buscar"
        aria-label="Buscar"
        aria-describedby="basic-addon1"
      />
      <ButtonGroup>
        <Button variant="outline-secondary">
          <FontAwesomeIcon icon={faSort} /> Ordenar
        </Button>
        <Button variant="outline-secondary">
          <FontAwesomeIcon icon={faCalendarDays} /> Data
        </Button>
        <Button variant="outline-secondary">
          <FontAwesomeIcon icon={faFilter} /> Filtros
        </Button>
      </ButtonGroup>
    </InputGroup>
  );
}
