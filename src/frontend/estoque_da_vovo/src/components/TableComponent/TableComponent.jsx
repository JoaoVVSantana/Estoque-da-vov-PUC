import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import './TableComponent.css'

export default function TableComponent({ items, onRowClick, onSelectionChange }) {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!items || items.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  // Normalizar os nomes das colunas de ID para "id"
  const normalizedItems = items.map((item) => {
    const normalizedItem = { ...item };
    for (const key in item) {
      if (key.startsWith('id_')) {
        normalizedItem['id'] = item[key];
        delete normalizedItem[key];
      }
    }
    return normalizedItem;
  });

  // Extrai as chaves do primeiro item para criar o cabeçalho dinamicamente
  const headers = Object.keys(normalizedItems[0]);

  // Função para alternar a seleção de um item
  const toggleSelection = (id) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id) // Remove o ID se já estiver selecionado
      : [...selectedIds, id]; // Adiciona o ID se não estiver selecionado

    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds); // Emite os IDs selecionados para o componente pai
  };

  return (
    <div className='table-container'>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    const allIds = normalizedItems.map((item) => item.id);
                    setSelectedIds(allIds);
                    onSelectionChange(allIds);
                  } else {
                    setSelectedIds([]);
                    onSelectionChange([]);
                  }
                }}
                checked={selectedIds.length === normalizedItems.length && normalizedItems.length > 0}
              />
            </th>
            {headers.map((header, index) => (
              <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedItems.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick(item.id)} // Retorna o ID ao clicar na linha
              style={{ cursor: 'pointer' }}
            >
              <td
                onClick={(e) => e.stopPropagation()} // Impede o clique no checkbox de acionar o clique na linha
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Impede o clique no checkbox de acionar o clique na linha
                    toggleSelection(item.id);
                  }}
                />
              </td>
              {headers.map((header, index) => (
                <td key={index}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

