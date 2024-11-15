import React from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';

export default function TableComponent() {
  return (
    <Tabs defaultActiveKey="geral" id="table-tabs" className="mb-3">
      <Tab eventKey="geral" title="Geral">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Previsão de Término</th>
              <th>Validade</th>
              <th>Gasto Diário</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produto 1</td>
              <td>Descrição 1</td>
              <td>Categoria 1</td>
              <td>100</td>
              <td>30/12/2024</td>
              <td>15/12/2024</td>
              <td>5</td>
              <td>01/11/2024</td>
            </tr>
            <tr>
              <td>Produto 2</td>
              <td>Descrição 2</td>
              <td>Categoria 2</td>
              <td>200</td>
              <td>25/11/2024</td>
              <td>10/11/2024</td>
              <td>10</td>
              <td>02/11/2024</td>
            </tr>
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="medicamentos" title="Medicamentos">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Previsão de Término</th>
              <th>Validade</th>
              <th>Gasto Diário</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Medicamento 1</td>
              <td>Descrição Medicamento</td>
              <td>Medicamentos</td>
              <td>50</td>
              <td>30/11/2024</td>
              <td>20/11/2024</td>
              <td>2</td>
              <td>01/11/2024</td>
            </tr>
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  );
}
