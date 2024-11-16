import React from 'react';

import Btn from '../../components/Btn/Btn.jsx';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';
import TitleContent from './../../components/TitleContent/TitleContent';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";






export default function Estoque() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/estoque/novo-produto");
    };

    return (
        <>
            <BreadCrumbNav/>
            <TitleContent title={"Estoque de Produtos"}/>
            <Btn text="Novo Produto" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClick}/>
            <TableToolbar />
            <TableComponent />
        </>
    );
}