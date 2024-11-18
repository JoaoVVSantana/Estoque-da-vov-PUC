import React from 'react';
import ApexCharts from 'react-apexcharts';

const PieChart = () => {
    const pieChartOptions = {
        chart: {
            type: 'pie',
            height: 350
        },
        labels: ['7 dias', '30 dias', 'Mais de 30 dias'],
        colors: ['#f0bbc6', '#EF88A0', '#906ec0'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const pieChartSeries = [35, 50, 15]; // Valores fictícios para os itens com validade próxima

    return (
        <div className="chart-container">
            <h4>Itens com Validade Próxima</h4>
            <ApexCharts
                options={pieChartOptions}
                series={pieChartSeries}
                type="pie"
                height={350}
            />
        </div>
    );
};

export default PieChart;