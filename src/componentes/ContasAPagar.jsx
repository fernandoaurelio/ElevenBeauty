import { useEffect, useState } from 'react';
import axios from 'axios';
import Popover from './AddonsApp/Popover';

function ContasAPagar() {
	const [filtro, setFiltro] = useState('mes');
	const [dados, setDados] = useState([]);
	const [mostrarPopover, setMostrarPopover] = useState(false);

	const abrirPopoverSaida = () => setMostrarPopover(true);
	const fecharPopover = () => setMostrarPopover(false);

	useEffect(() => {
		axios.get(`http://localhost:3001/contas-pagar?filtro=${filtro}`)
			.then(res => {
				console.log("Dados recebidos:", res.data);
				setDados(res.data);
			})
			.catch(error => {
				console.error("Erro ao buscar contas: ", error);
			});
	}, [filtro]);

	return (
		<div className="bg-white text-gray-800 p-3 rounded-xl shadow-lg border border-slate-300">
			{/* 👉 Aqui renderiza o Popover de saída */}
			{mostrarPopover && (
				<Popover
					tipo="Saída"
					onClose={fecharPopover}
				/>
			)}

			<div className="flex justify-between items-center">
				<h3 className="text-sm font-medium text-gray-500">Contas a Pagar</h3>
				<select
					name="filtroContas"
					id="filtroContas"
					value={filtro}
					onChange={(e) => setFiltro(e.target.value)}
					className="rounded-xl bg-slate-200 text-sm font-medium text-gray-500 p-2"
				>
					<option value="mes">Neste Mês</option>
					<option value="dia">Neste Dia</option>
					<option value="ano">Neste Ano</option>
				</select>
			</div>

			{dados.length === 0 ? (
				<div className="text-center p-10">
					<img src="../src/images/Invoice-bro.svg" alt="Sem dados" className="w-60 mx-auto mb-4" />
					<p className="text-gray-500">Nenhuma conta em aberto encontrada.</p>
					<button className="cursor-pointer mt-6 flex gap-2 px-4 py-2 text-sm font-semibold rounded bg-slate-600 hover:bg-slate-700 text-white shadow transition mx-auto">
						Cadastre suas Despesas
					</button>
				</div>
			) : (
				<>
					<table className="w-full table-auto border-collapse text-sm bg-white shadow rounded-lg overflow-hidden mt-4">
						<thead className="bg-slate-100 text-slate-700 uppercase text-xs font-semibold">
							<tr>
								<th className="px-4 py-3 text-left">Vencimento</th>
								<th className="px-4 py-3 text-left">Fornecedor</th>
								<th className="px-4 py-3 text-left">Valor</th>
								<th className="px-4 py-3 text-left">Parcelas</th>
							</tr>
						</thead>
						<tbody className="text-slate-800 divide-y divide-slate-200">
							{dados.map((conta, index) => (
								<tr key={index} className="hover:cursor-pointer hover:bg-slate-300">
									<td className="px-4 py-2">{new Date(conta.data).toLocaleDateString()}</td>
									<td className="px-4 py-2">{conta.fornecedor}</td>
									<td className="px-4 py-2">R$ {parseFloat(conta.valor).toFixed(2)}</td>
									<td className="px-4 py-2">{conta.parcela_atual}/{conta.total_parcelas}</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="flex justify-center">
						<button
							onClick={abrirPopoverSaida}
							className="cursor-pointer mt-6 flex gap-2 px-4 py-2 text-sm font-semibold rounded bg-slate-600 hover:bg-slate-700 text-white shadow transition"
						>
							Mais Detalhes
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default ContasAPagar;
