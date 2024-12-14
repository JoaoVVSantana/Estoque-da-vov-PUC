import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import './BreadCrumbNav.css'

export default function BreadCrumbNav() {
    const location = useLocation();

    // Divide o caminho em partes para cada segmento
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <Breadcrumb>
            <Breadcrumb.Item />
            {pathnames.map((value, index) => {
                // Constrói o caminho parcial para cada item
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <Breadcrumb.Item active key={to}>
                        {treatment(value)}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item  key={to}>
                        {treatment(value)}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

// Função auxiliar para fazer devidos tratamento do texto do breadcrumb
function treatment(str) {
    const capitalize = str.charAt(0).toUpperCase() + str.slice(1);
    const space = capitalize.replace("-", " ");
    return space;
}