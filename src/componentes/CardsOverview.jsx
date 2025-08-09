import {PlusCircle,MinusCircle,Eye,CreditCard} from 'lucide-react';
import { useState,useMemo } from 'react';

// Função auxiliar para formatar os valores como moeda brasileira (BRL)
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};
function FinanceCards({ dados = [] }) {
  // useMemo recalcula os totais apenas quando a prop 'dados' mudar.
  const { totalEntradas, totalSaidas, saldoTotal, formasPagamento } = useMemo(() => {
    // Calcula o total de entradas
    const totalEntradas = dados
    .filter(item => item.tipo === 'Entrada')
    .reduce((acc, item) => acc + item.valor, 0);

    // Calcula o total de saídas
    const totalSaidas = dados
      .filter(item => item.tipo === 'Saída') // Assumindo que o tipo é 'Saida'
      .reduce((acc, item) => acc + item.valor, 0);

    // Calcula o saldo total
      const saldoTotal = totalEntradas - totalSaidas;

    // Agrupa e soma os valores por forma de pagamento
      const formasPagamento = dados.reduce((acc, item) => {
        const { forma_pagamento, valor } = item;
        if (!acc[forma_pagamento]) {
          acc[forma_pagamento] = 0;
        }
        acc[forma_pagamento] += valor;
        return acc;
      }, {});

      return { totalEntradas, totalSaidas, saldoTotal, formasPagamento };
  }, [dados]); // A dependência do useMemo é a lista de dados
  return (

    <div className="grid grid-cols-4 gap-4 mt-6 justify-between">

      {/* Entradas */}
      <div className="bg-lime-300 text-gray-800 p-4 rounded-xl shadow-md border-green-500 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">Entradas</h3>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(totalEntradas)}</p>
        </div>
        
      </div>

      {/* Saídas */}
      <div className="bg-red-300 text-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">Saídas</h3>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(totalSaidas)}</p>
        </div>
        
      </div>

      {/* Saldo Total */}
      <div className="bg-blue-300 text-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">Saldo Total</h3>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(saldoTotal)}</p>
        </div>
        
      </div>

      {/* Formas de Pagamento */}
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Formas de Pagamento</h3>
          <ul className="mt-2 text-sm space-y-1">
            {Object.keys(formasPagamento).length > 0 ? (
              Object.entries(formasPagamento).map(([forma, total]) => (
                <li key={forma} className="flex justify-between">
                  <span>{forma}</span>
                  <span className="font-semibold">{formatarMoeda(total)}</span>
                </li>
                ))
              ) : (
              <li className="text-gray-500">Nenhum dado disponível.</li>
              )}
            </ul>
          </div>        
        </div>

      </div>
      );
}

export default FinanceCards;
