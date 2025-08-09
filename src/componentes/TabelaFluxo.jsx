import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Funnel } from 'lucide-react';
import FiltroPopover from './AddonsApp/Popover';

function TabelaFluxo() {
  const [dados, setDados] = useState([]);
  const [popoverAberto, setPopoverAberto] = useState(null); // 'data', 'descricao', etc
  const [anchorPos, setAnchorPos] = useState({ top: 0, left: 0 });

  const carregarDados = async (filtro = {}) => {
    const res = await axios.get('http://localhost:3001/fluxo', {
      params: filtro,
    });
    setDados(res.data);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // 👉 Função que abre o popover e define onde ele aparece
  const abrirPopover = (campo, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setAnchorPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setPopoverAberto(campo);
  };

  const fecharPopover = () => setPopoverAberto(null);

  return (
    <div className="relative bg-white text-gray-800 p-4 rounded-xl shadow-lg border border-slate-300">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Fluxo de Entradas e Saídas</h3>

      {/* POPUP FORA DA TABELA (POSICIONADO ABSOLUTO) */}
      {popoverAberto && (
        <FiltroPopover
          tipo="filtro"
          campo={popoverAberto}
          onClose={fecharPopover}
          onFiltrar={(filtro) => {
            carregarDados(filtro);
            fecharPopover();
          }}
          anchorPos={anchorPos}
          />
          )}

      <table className="w-full table-auto border-collapse text-sm bg-white shadow rounded-lg mt-4">
        <thead className="bg-slate-100 text-slate-700 uppercase text-xs font-semibold">
          <tr>
            {['data', 'descricao', 'valor', 'forma_pagamento', 'tipo'].map((campo) => (
              <th key={campo} className=" px-4 py-3 text-left">
                <div className="flex justify-between gap-1">
                  {campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ')}
                  <button onClick={(e) =>  abrirPopover(campo, e)}>
                    <Funnel className="cursor-pointer w-4 h-4 text-slate-600 hover:text-slate-900 transition" />
                  </button>
                </div>
              </th>
              ))}
          </tr>
        </thead>
        <tbody className="text-slate-800 divide-y divide-slate-200">
          {dados.map((item, index) => (
            <tr
              key={index}
              className={`hover:cursor-pointer ${
                item.tipo === 'Entrada' ? 'hover:bg-green-200' : 'hover:bg-red-200'
              }`}
            >
              <td className="px-4 py-2">{new Date(item.data).toLocaleDateString()}</td>
              <td className="px-4 py-2">{item.descricao}</td>
              <td className="px-4 py-2">R$ {item.valor.toFixed(2)}</td>
              <td className="px-4 py-2">{item.forma_pagamento}</td>
              <td className="px-4 py-2">{item.tipo}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    );
}

export default TabelaFluxo;
