import React from 'react';

import Btn from '../../components/Btn/Btn.jsx';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TitleContent from './../../components/TitleContent/TitleContent';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';



export default function Estoque() {
    return (
        <>
            <BreadCrumbNav/>
            <TitleContent title={"Estoque"}/>
            <Btn text="Novo Produto" icon={<FontAwesomeIcon icon={faPlus} />}/>
            <TableToolbar />
            <TableComponent />
        </>
    );
}