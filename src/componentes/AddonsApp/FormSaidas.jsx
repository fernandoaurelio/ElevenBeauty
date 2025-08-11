import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import axios from 'axios';

function AddSaidas({ onClose, onSuccess }) {
	// Estados para os inputs do formulário
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [data, setVencimento] = useState(new Date().toISOString().split('T')[0]);
	const [forma_pagamento, setFormaPagamento] = useState("");
	const [conta, setConta] = useState("");
	const [categoria, setCategoria] = useState("");
	const [fornecedor, setFornecedor] = useState("");
	const [profissional, setProfissional] = useState("");	
	const [numeroParcelas, setNumeroParcelas] = useState("1");
	const [recorrenciaParcelas, setRecorrenciaParcelas] = useState("30"); // Padrão Mensal

	// Estado para controlar a visibilidade da seção de recorrência
	const [mostrarRecorrencia, setMostrarRecorrencia] = useState(false);

	// Função para lidar com o envio do formulário (com todas as correções)
	const SalvarDados = async (e) => {
		e.preventDefault();

		let despesasParaSalvar = [];

		if (mostrarRecorrencia) {
			const dataBase = new Date(data + 'T00:00:00');
			const intervalo = parseInt(recorrenciaParcelas, 10);
			const totalParcelas = parseInt(numeroParcelas, 10);

        // --- CORREÇÃO APLICADA AQUI ---
        // 1. Calcule o valor de cada parcela.
        // O .toFixed(2) garante que o resultado tenha sempre 2 casas decimais (centavos).
			const valorDaParcela = (parseFloat(valor) / totalParcelas).toFixed(2);

			for (let i = 0; i < totalParcelas; i++) {
				const novaDataVencimento = new Date(dataBase);
				if (intervalo === 30) {
					novaDataVencimento.setMonth(novaDataVencimento.getMonth() + i);
				} else {
					novaDataVencimento.setDate(novaDataVencimento.getDate() + (i * intervalo));
				}

				despesasParaSalvar.push({
                // 2. Use o valor calculado da parcela aqui.
                // parseFloat() é usado pois .toFixed() retorna uma string.
					valor: parseFloat(valorDaParcela), 
					descricao: `${descricao} (Parcela ${i + 1}/${totalParcelas})`,
					data: novaDataVencimento.toISOString().split('T')[0],
					forma_pagamento,
					conta,
					categoria,
					fornecedor,
					profissional,
					tipo: 'Saida',
					status: "Aberto"
				});
			}
		} else {
        // ... (o código para despesa única continua igual e já está correto)
			despesasParaSalvar.push({
				valor: parseFloat(valor),
				descricao,
				data,
				forma_pagamento,
				conta,
				categoria,
				fornecedor,
				profissional,
				tipo: 'Saida',
				status: "Pago"
			});
		}

		console.log("Dados a serem enviados para o backend:", despesasParaSalvar);

		try {
			for (const despesa of despesasParaSalvar) {
				await axios.post('http://localhost:3001/AddFluxo', despesa);
			}
			console.log('Despesa(s) cadastrada(s) com sucesso!');
			if (onSuccess) {
				onSuccess("Saida");
			}
			if (onClose) {
				onClose();
			}
		} catch (error) {
			console.error("Erro ao registrar Dados na Tabela", error);
		}
	};
	return (
		<>
		<div className="fixed top-0 right-0 z-50 h-full w-[550px] bg-white shadow-xl flex flex-col">
				{/* Cabeçalho */}
			<div className="flex items-center justify-between p-4 border-b">
				<h2 className="text-lg font-semibold">Nova despesa</h2>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"><CircleX /></button>
			</div>

				{/* Corpo do Formulário */}
			<div className="flex-1 overflow-y-auto p-4">
				<form onSubmit={SalvarDados} className="space-y-4">
						{/* Valor e Descrição */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Valor *</label>
							<input type="number" placeholder="R$ 0,00" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={parseFloat(valor)} onChange={(e) => setValor(e.target.value)} required />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Descrição</label>
							<input type="text" placeholder="Insira uma descrição" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
						</div>
					</div>

						{/* Vencimento e Forma de Pagamento */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Vencimento *</label>
							<input type="date" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={data} onChange={(e) => setVencimento(e.target.value)} required />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Forma de pagamento *</label>
							<select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={forma_pagamento} onChange={(e) => setFormaPagamento(e.target.value)} required>
								<option value="">Selecione</option>
								<option value="Cartão de crédito">Cartão de crédito</option>
								<option value="PIX">PIX</option>
								<option value="Dinheiro">Dinheiro</option>
								<option value="Boleto">Boleto</option>
							</select>
						</div>
					</div>

						{/* Conta e Categoria */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Conta</label>
							<input type="text" placeholder="Conta de origem" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={conta} onChange={(e) => setConta(e.target.value)} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Categoria *</label>
							<select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
								<option value="">Selecione</option>
								<option value="Fornecedor">Fornecedor</option>
								<option value="Profissional">Profissional</option>
								<option value="Outras">Outras</option>
							</select>
						</div>
					</div>

						{/* Fornecedor e Profissional */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Pago para fornecedor</label>
							<input type="text" placeholder="Nome do fornecedor" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Pago para profissional</label>
							<input type="text" placeholder="Nome do profissional" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={profissional} onChange={(e) => setProfissional(e.target.value)} />
						</div>
					</div>

						{/* Checkboxes */}
					<div className="space-y-3 pt-2">
						<label className="flex items-center gap-2 cursor-pointer">
							<input type="checkbox" className="form-checkbox h-4 w-4 text-lime-600 rounded border-gray-300 focus:ring-lime-500" checked={mostrarRecorrencia} onChange={(e) => setMostrarRecorrencia(e.target.checked)} />
							<span className="text-sm">Adicionar recorrência</span>
						</label>
					</div>
					{mostrarRecorrencia && (
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="block text-sm font-medium mb-1">Número de Parcelas</label>
								<input type="number" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={numeroParcelas} onChange={(e) => setNumeroParcelas(e.target.value)} />
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Recorrência</label>
								<select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" value={recorrenciaParcelas} onChange={(e) => setRecorrenciaParcelas(e.target.value)}>
									<option value="7">Semanal</option>
									<option value="15">Quinzenal</option>
									<option value="30">Mensal</option>
								</select>
							</div>
						</div>
						)}
				</form>
			</div>

				{/* Rodapé */}
			<div className="p-4 flex justify-end bg-gray-50 border-t">
				<button onClick={SalvarDados} className="bg-lime-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-lime-700 transition-colors">
					Salvar
				</button>
			</div>
		</div>
		</>
		);
}

export default AddSaidas;
