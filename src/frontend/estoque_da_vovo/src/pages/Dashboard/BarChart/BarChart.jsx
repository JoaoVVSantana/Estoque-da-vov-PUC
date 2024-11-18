import React from 'react';
import ApexCharts from 'react-apexcharts';

const BarChart = () => {
    const barChartOptions = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Alimentos', 'Medicamentos', 'Produtos de Higiene', 'Produtos de Limpeza'],
        },
        colors: ['#906ec0', '#17a2b8', '#ffc107', '#dc3545'],
    };

    const barChartSeries = [{
        name: 'Quantidade',
        data: [150, 80, 40, 20] // Valores fictícios para exemplo
    }];

    return (
        <div className="chart-container">
            <h4>Quantidade de Itens por Categoria</h4>
            <ApexCharts
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default BarChart;