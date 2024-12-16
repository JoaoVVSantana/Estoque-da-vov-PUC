import React from 'react';
import Chart from 'react-apexcharts';

export default function PieChart({ doadores }) {
    // Valida os dados recebidos
    const doadoresValidos = Array.isArray(doadores) ? doadores : [];

    console.log("chart:");
    console.log(doadores);

    // Processa os dados
    const labels = doadoresValidos.map(doador => doador.nome);
    const data = doadoresValidos.map(doador => doador.quantidadeItensDoados);

    const chartOptions = {
        chart: { type: 'pie' },
        title: { text: 'Proporção de Itens já Doados (por cada Doador)' },
        labels,
    };

    return (
        <Chart
            options={chartOptions}
            series={data}
            type="pie"
            height={350}
        />
    );
}
