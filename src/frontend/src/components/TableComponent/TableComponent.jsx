import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import './TableComponent.css';

export default function TableComponent({ items, rowIds, onRowClick, onSelectionChange, noSelect }) {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!items || items.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  // Extrai as chaves do primeiro item para criar o cabeçalho dinamicamente
  const headers = Object.keys(items[0]);

  // Função para alternar a seleção de um item
  const toggleSelection = (id) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id) // Remove o ID se já estiver selecionado
      : [...selectedIds, id]; // Adiciona o ID se não estiver selecionado

    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds); // Emite os IDs selecionados para o componente pai
  };

  return (
    <div className="table-container">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {!noSelect && ( // Renderiza a coluna de seleção apenas se noSelect for false
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setSelectedIds(rowIds);
                      onSelectionChange(rowIds);
                    } else {
                      setSelectedIds([]);
                      onSelectionChange([]);
                    }
                  }}
                  checked={selectedIds.length === rowIds.length && rowIds.length > 0}
                />
              </th>
            )}
            {headers.map((header, index) => (
              <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={rowIds[index]}
              onClick={() => onRowClick(rowIds[index])} // Retorna o ID ao clicar na linha
              style={{ cursor: 'pointer' }}
            >
              {!noSelect && ( // Renderiza a célula do checkbox apenas se noSelect for false
                <td
                  onClick={(e) => e.stopPropagation()} // Impede o clique no checkbox de acionar o clique na linha
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(rowIds[index])}
                    onChange={(e) => {
                      e.stopPropagation(); // Impede o clique no checkbox de acionar o clique na linha
                      toggleSelection(rowIds[index]);
                    }}
                  />
                </td>
              )}
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
