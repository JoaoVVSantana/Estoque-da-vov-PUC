import React from 'react';

import Btn from '../../components/Btn/Btn.jsx';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';
import TitleContent from './../../components/TitleContent/TitleContent';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';

import { Tabs, Tab } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { dataProduto } from '../../data/constants.js';

export default function Estoque() {
    const navigate = useNavigate();

    function handleClickNewProduct() {
        navigate("/estoque/novo-produto");
    };

    function handleRowClick(itemId) {
        console.log("ID clicado:", itemId);
        alert(`ID do item clicado: ${itemId}`);
    }

    function handleSelectionChange(selectedIds) {
        console.log("IDs selecionados:", selectedIds);
    }

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Estoque de Produtos"} />
            <Btn text="Novo Produto" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClickNewProduct} />
            <TableToolbar />
            <Tabs defaultActiveKey="geral" id="table-tabs" className="mb-3">
                <Tab eventKey="geral" title="Geral">
                    <TableComponent items={dataProduto} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange}/>
                </Tab>
                <Tab eventKey="medicamentos" title="Medicamentos">
                    <TableComponent items={dataProduto} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange}/>
                </Tab>
                <Tab eventKey="Doações" title="Doações">
                    <TableComponent items={dataProduto} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange} />
                </Tab>
            </Tabs>

        </>
    );
}