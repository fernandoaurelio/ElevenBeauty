import React from 'react';
import { useState } from "react";
import { CircleX } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";



function AddVales({ onClose,onSucess }) {
  const [data, setData] = useState(null);

	return (
		<div className="fixed top-0 right-0 z-50 h-full w-[550px] bg-white shadow-xl flex flex-col">
      {/* Cabeçalho */}
			<div className="flex items-center justify-between p-4">
				<h2 className="text-lg font-semibold">Novo Vale</h2>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer">
					<CircleX />
				</button>
			</div>

      {/* Corpo do Formulário */}
			<div className="flex-1 overflow-y-auto p-4">
				<form className="space-y-4">
					<label className="block text-sm font-medium mb-1">Nome do Profissional *</label>
					<input type="text" name="nomeProfissional" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" />

          {/* Data da Solicitação e Valor */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Data da solicitação *</label>
							<DatePicker
								selected={data}
								onChange={(date) => setData(date)}
								name="dataVale"
								
								dateFormat="dd/MM/yyyy"
								locale={ptBR}
								placeholderText="Selecione uma data"
								className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Valor solicitado (R$) *</label>
							<input type="number" step="0.01" placeholder="0,00" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" />
						</div>
					</div>

          {/* Forma de pagamento */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Forma de pagamento *</label>
							<select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors">
								<option value="">Selecione</option>
								<option value="desconto_folha">Desconto em folha</option>
								<option value="desconto_comissao">Desconto em comissões</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Pagamento feito em *</label>
							<select className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors">
								<option value="">Selecione</option>
								<option value="Dinheiro">Dinheiro</option>
								<option value="Pix">Pix</option>
							</select>
						</div>
					</div>

          {/* Motivo do vale */}
					<div>
						<label className="block text-sm font-medium mb-1">Motivo do vale</label>
						<textarea placeholder="Descreva o motivo (opcional)" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" rows={3}></textarea>
					</div>

          {/* Data prevista e Observações */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Data prevista para desconto *</label>
							<DatePicker
								selected={data}
								onChange={(date) => setData(date)}
								dateFormat="dd/MM/yyyy"
								locale={ptBR}
								placeholderText="Selecione uma data"
								className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Observações</label>
							<input type="text" placeholder="Informações adicionais" className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-lime-300 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors" />
						</div>
					</div>
				</form>
			</div>

      {/* Rodapé */}
			<div className="p-4 flex justify-end bg-gray-50">
				<button className="bg-lime-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-lime-700 transition-colors">
					Salvar
				</button>
			</div>
		</div>
		);
}

export default AddVales;
