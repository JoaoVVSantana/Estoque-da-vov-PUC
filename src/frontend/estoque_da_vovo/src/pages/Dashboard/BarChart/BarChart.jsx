import React from 'react';
import Chart from 'react-apexcharts';

export default function BarChart({ itensGeral }) {
    // Processa os dados recebidos por props para agrupar por tipo
    const itensPorCategoria = itensGeral.reduce((acc, item) => {
        acc[item.tipo] = (acc[item.tipo] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.keys(itensPorCategoria);
    const data = Object.values(itensPorCategoria);

    const chartOptions = {
        chart: { type: 'bar' },
        title: { text: 'Quantidade de Produtos (por Categoria)' },
        xaxis: { categories },
        plotOptions: { bar: { horizontal: false } },
        colors: ['#906ec0'],
    };

    return (
        <Chart
            options={chartOptions}
            series={[{ name: 'Produtos', data }]}
            type="bar"
            height={350}
        />
    );
}
