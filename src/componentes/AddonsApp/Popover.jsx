// Popover.jsx (agora funcionando como uma sidebar de formulários)

import { useState, useEffect } from 'react';

// Importe todos os seus formulários aqui
import FormularioEntrada from './FormEntradas';
import FormularioSaida from './FormSaidas'; // Descomente quando criar
import FormularioVale from './FormVales';   // Descomente quando criar

// ✅ Props novas: isOpen e onSuccess
function Popover({ isOpen, tipo, campo, onClose, onFiltrar, onSuccess }) {

  // ✅ A correção mais importante: Se não for para estar aberto, não renderiza nada.
  if (!isOpen) {
    return null;
  }

  // Lógica para escolher qual formulário mostrar
  let conteudo;
  switch (tipo) {
    case 'Entrada':
      // ✅ Passa as funções para o formulário correto
      conteudo = <FormularioEntrada onClose={onClose} onSuccess={onSuccess} />;
      break;
    case 'Saída':
      conteudo = <FormularioSaida onClose={onClose} onSuccess={onSuccess} />; // Quando você criar
      //conteudo = <div className="p-6">Formulário de Saída ainda não implementado.</div>;
      break;
    case 'Vale':
       conteudo = <FormularioVale onClose={onClose} onSuccess={onSuccess} />; // Quando você criar
      //conteudo = <div className="p-6">Formulário de Vale ainda não implementado.</div>;
      break;
    case 'filtro':
      // A sua lógica de filtro (já estava boa)
      conteudo = <div>Sua Lógica de Filtro Aqui...</div>;
      break;
    default:
      conteudo = <div className="p-6">Selecione uma opção.</div>;
  }

  return (
    <>
      {/* Fundo escurecido que fecha o popover ao clicar */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Painel lateral */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white shadow-xl flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {tipo === 'filtro'
              ? `Filtrar por: ${campo}`
              : `Adicionar ${tipo}`
            }
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>

        {/* Conteúdo (o formulário) */}
        <div className="flex-1 overflow-y-auto">{conteudo}</div>
      </div>
    </>
  );
}

export default Popover;