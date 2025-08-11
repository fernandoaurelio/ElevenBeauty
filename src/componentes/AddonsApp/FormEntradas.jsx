import React, { useState } from 'react';
import axios from 'axios';
import { CircleX } from 'lucide-react'; // Importando o ícone

// O componente agora tem a mesma estrutura e estilo do painel lateral de Saídas
function FormRecebimento({ onClose, onSuccess }) {
  const [valorBruto, setValorBruto] = useState('');
  const [taxas, setTaxas] = useState('0,00');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [conta, setConta] = useState('');
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('Padrão');
  const [recorrencia, setRecorrencia] = useState(false);

  // Funções 'calcularLiquido', etc, continuam iguais...
  const calcularLiquido = () => {
    const bruto = parseFloat(valorBruto.replace(',', '.')) || 0;
    const taxa = parseFloat(taxas.replace(',', '.')) || 0;
    return (bruto - taxa).toFixed(2).replace('.', ',');
  };

  const enviaRequisicao = async (e) => {
    e.preventDefault();

    const dadosEntrada = {
      valor: parseFloat(valorBruto.replace(',', '.')),
      forma_pagamento: formaPagamento,
      tipo: "Entrada",
      data: data,
      descricao: descricao, 
      status: status     
      // ...outros campos que seu backend precisa
    };

    try {
      await axios.post('http://localhost:3001/AddFluxo', dadosEntrada);
      console.log('Cadastrado com sucesso!');
      
      if(onSuccess) {
        onSuccess("Entrada");
      }
      if(onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Erro ao registrar na DB", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 h-full w-[550px] bg-white shadow-xl flex flex-col animate-slide-in">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Nova receita</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"><CircleX /></button>
        </div>

        {/* Corpo do Formulário */}
        <form id="formEntrada" onSubmit={enviaRequisicao} className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">* Valor bruto</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        placeholder="R$ 0,00"
                        value={valorBruto}
                        onChange={(e) => setValorBruto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Taxas</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 bg-gray-100 cursor-not-allowed"
                        value={taxas}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Valor líquido</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 bg-gray-100 cursor-not-allowed"
                        value={`R$ ${calcularLiquido()}`}
                        readOnly
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                    rows="2"
                    placeholder="Insira uma descrição (opcional)"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">* Vencimento</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">* Forma de pagamento</label>
                    <select
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        value={formaPagamento}
                        onChange={(e) => setFormaPagamento(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Pix">Pix</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão">Cartão</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">* Conta</label>
                    <select
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        value={conta}
                        onChange={(e) => setConta(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Caixa">Caixa</option>
                        <option value="Banco">Banco</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Recebido de</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        placeholder="Busque por um cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">* Categoria</label>
                    <select
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="Padrão">Padrão</option>
                        <option value="Serviço">Serviço</option>
                        <option value="Comissão">Comissão</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-lime-600 rounded border-gray-300 focus:ring-lime-500"
                        checked={recorrencia}
                        onChange={(e) => setRecorrencia(e.target.checked)}
                    />
                    <span className="text-sm">Adicionar recorrência</span>
                </label>
            </div>
            {recorrencia && (
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Vencimento sempre dia</label>
                        <input type="number" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Número de Parcelas</label>
                        <input type="number" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Recorrência</label>
                        <select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors">
                            <option value="7">Semanal</option>
                            <option value="15">Quinzenal</option>
                            <option value="30">Mensal</option>
                        </select>             
                    </div>
                </div>
            )}
        </form>

        {/* Rodapé */}
        <div className="p-4 flex justify-end bg-gray-50">
            <button
                type="submit"
                form="formEntrada"
                className="bg-lime-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-lime-700 transition-colors"
            >
                Salvar
            </button>
        </div>
    </div>
  );
}

export default FormRecebimento;
