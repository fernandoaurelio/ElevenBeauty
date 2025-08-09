import { useMemo } from 'react';
import { Chart } from "react-google-charts";

function GraficosFluxo({ dados }) {
  // Garante que 'dados' seja sempre um array para evitar erros.
  const safeDados = dados || [];

  // Prepara os dados para o formato que o LineChart espera.
  const chartData = useMemo(() => {
    if (safeDados.length === 0) {
      // Retorna um cabeçalho e uma linha de dados vazia se não houver dados
      return [["Data", "Entradas", "Saídas"], [new Date(), 0, 0]];
    }

    // 1. Agrupa as transações por dia
    const dailyData = safeDados.reduce((acc, item) => {
      const date = item.data.split('T')[0]; // Pega apenas a parte da data (YYYY-MM-DD)
      if (!acc[date]) {
        acc[date] = { entradas: 0, saidas: 0 };
      }
      if (item.tipo.toLowerCase() === 'entrada') {
        acc[date].entradas += item.valor;
      } else if (item.tipo.toLowerCase() === 'saída') {
        acc[date].saidas += item.valor;
      }
      return acc;
    }, {});

    // 2. Converte o objeto em um array e ordena por data
    const sortedData = Object.keys(dailyData).map(date => ({
      date: new Date(date), // Converte a string de data para um objeto Date
      ...dailyData[date]
    })).sort((a, b) => a.date - b.date);

    // 3. Formata para o array que a biblioteca de gráficos espera
    const formattedData = sortedData.map(item => [
      item.date,
      item.entradas,
      item.saidas
    ]);

    // 4. Adiciona o cabeçalho
    return [["Data", "Entradas", "Saídas"], ...formattedData];

  }, [safeDados]);

	return(
		<div className="bg-white text-gray-800 p-4 rounded-xl shadow-lg border border-slate-300">
			<Chart
				chartType="LineChart"
				width="100%"
				height="300px"
				data={chartData}
        options={{
          title: "Evolução de Entradas e Saídas por Dia",
          curveType: "function", // Deixa as linhas mais suaves
          legend: { position: "bottom" },
          hAxis: {
            title: "Data",
            format: 'dd/MM/yy' // Formata a data no eixo
          },
          vAxis: {
            title: "Valor (R$)",
          },
          colors: ['#22c55e', '#ef4444'] // Verde para entradas, vermelho para saídas
        }}
			/>
		</div>
	);
}

export default GraficosFluxo;
