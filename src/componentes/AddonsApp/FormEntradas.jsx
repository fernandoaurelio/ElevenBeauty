// formEntradas.jsx (FormRecebimento)

import { useState } from 'react';
import axios from 'axios';


function FormRecebimento({ onClose, onSuccess }) {
  const [valorBruto, setValorBruto] = useState('');
  const [taxas, setTaxas] = useState('0,00');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [conta, setConta] = useState('');
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('Padrão');
  const [ajustarDatas, setAjustarDatas] = useState(false);
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
      // ...outros campos que seu backend precisa
    };

    try {
      await axios.post('http://localhost:3001/AddFluxo', dadosEntrada); 
      console.log('Cadastrado com sucesso!');
      
      // ✅ AQUI ESTÁ A MUDANÇA
      // Avisa o pai que o cadastro deu certo e passa o tipo
      onSuccess("Entrada");

    } catch (error) {
      console.error("Erro ao registrar na DB", error);
      alert("Falha ao registrar a entrada. Tente novamente.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <form id="formEntrada" onSubmit={enviaRequisicao} className="p-6 space-y-6 overflow-y-auto flex-1">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">* Valor bruto</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="R$ 0,00"
              value={valorBruto}
              onChange={(e) => setValorBruto(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Taxas</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded bg-gray-100"
              value={taxas}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium">Valor líquido</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded bg-gray-100"
              value={`R$ ${calcularLiquido()}`}
              readOnly
            />
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            className="w-full mt-1 p-2 border rounded"
            rows="2"
            placeholder="Insira uma descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* Linha: Vencimento, Forma pagamento, Conta */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">* Vencimento</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">* Forma de pagamento</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              required
            >
              <option value="">Forma de pagamento</option>
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">* Conta</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              required
            >
              <option value="">Conta</option>
              <option value="Caixa">Caixa</option>
              <option value="Banco">Banco</option>
            </select>
          </div>
        </div>

        {/* Linha: Cliente, Categoria */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Recebido de</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Busque por um cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">* Categoria</label>
            <select
              className="w-full mt-1 p-2 border rounded"
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

        {/* Switches */}
        <div className="flex items-center gap-4 pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={ajustarDatas}
              onChange={() => setAjustarDatas(!ajustarDatas)}
            />
            <span className="text-sm">Ajustar datas de competência e baixa</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={recorrencia}
              onChange={() => setRecorrencia(!recorrencia)}
            />
            <span className="text-sm">Adicionar recorrência</span>
          </label>
        </div>
      </form>

      {/* Botão de salvar fixo */}
      <div className="p-4 flex justify-end">
        <button
          type="submit"
          form="formEntrada"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Salvar
        </button>
      </div>
    </div>
    );
}


export default FormRecebimento;