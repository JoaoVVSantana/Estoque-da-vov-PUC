import React from 'react';

import Btn from '../../components/Btn/Btn.jsx';
import TableToolbar from '../../components/TableToolbar/TableToolbar.jsx';
import TableComponent from './../../components/TableComponent/TableComponent.jsx';

export default function Estoque() {
    return (
        <>
            <h1>Estoque</h1>
            <Btn text="+ Novo Produto" />
            <TableToolbar />
            <TableComponent />
        </>
    );
}