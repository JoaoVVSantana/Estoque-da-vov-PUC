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

import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import useAxios from '../../hooks/useAxios.js';
import Loading from '../../components/Loading/Loadings.jsx';
import {renameKey} from '../../utils/renameKey.js';

export default function Estoque() {
    const [produtosData, loading, error] = useAxios({
        axiosInstance: axiosInstanceEstoque,
        method: 'GET',
        url: 'estoque/listarItens'
    })

    //falta map do doador
    const produtos = produtosData?.itens?.map(({ id_item,id_estoque, ...rest }) =>{
        rest = renameKey(rest,"id_doacao","doador");
        return rest;
    })
    const idsProdutos = produtosData?.itens?.map((item) => item.id_item);

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

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Estoque de Produtos"} />
            <Btn text="Novo Produto" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClickNewProduct} />
            <TableToolbar />
            <Tabs defaultActiveKey="geral" id="table-tabs" className="mb-3">
                <Tab eventKey="geral" title="Geral">
                    <TableComponent rowIds={idsProdutos} items={produtos} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange} />
                </Tab>
                <Tab eventKey="medicamentos" title="Medicamentos">
                    <TableComponent rowIds={idsProdutos} items={produtos} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange} />
                </Tab>
                <Tab eventKey="Doações" title="Doações">
                    <TableComponent rowIds={idsProdutos} items={produtos} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange} />
                </Tab>
            </Tabs>

        </>
    );
}