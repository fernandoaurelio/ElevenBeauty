// MainContent.jsx

import { useState } from 'react';
import { ChartSpline } from 'lucide-react';
import CardsOverview from './CardsOverview';
import BotoesFluxo from './BotoesFluxo';
import GraficoFluxo from './GraficosFluxo';
import ContasAPagar from './ContasAPagar';
import TabelaFluxo from './TabelaFluxo';

// ✅ Importe os componentes da sidebar e do modal de sucesso
import SidebarForm from '../componentes/AddonsApp/Popover'; // Renomeei para clareza
import Modal from './Modal'; // O seu modal de sucesso

function MainContent({ dados, carregarDados }) {

  // --- CONTROLE DA SIDEBAR DE FORMULÁRIOS ---
  const [sidebarInfo, setSidebarInfo] = useState({
    isOpen: false,
    tipo: null
  });

  // ✅ --- CONTROLE DO MODAL DE SUCESSO ---
  const [modalSucessoInfo, setModalSucessoInfo] = useState({
    isOpen: false,
    tipo: null
  });

  // --- FUNÇÕES DE CONTROLE ---

  // Chamada pelos botões para abrir a sidebar com o form correto
  const abrirSidebar = (tipo) => {
    setSidebarInfo({ isOpen: true, tipo: tipo });
  };
  
  // Chamada pela sidebar para se fechar
  const fecharSidebar = () => {
    setSidebarInfo({ isOpen: false, tipo: null });
  };

  // ✅ Função que o formulário chamará quando o cadastro der CERTO
  const handleCadastroSucesso = (tipoDoCadastro) => {
    // 1. Fecha a sidebar
    fecharSidebar();
    // 2. Recarrega os dados da tabela principal
    
    // 3. Abre o modal de sucesso
    setModalSucessoInfo({ isOpen: true, tipo: tipoDoCadastro });
  };

  // ✅ Função que o modal de sucesso chamará para se fechar
  const fecharModalSucesso = () => {
    setModalSucessoInfo({ isOpen: false, tipo: null });
    window.location.reload();
  };

  return (
    // Removi a classe 'pl-16' para não conflitar com a sidebar fixa
    <main className="pt-20 p-4 transition-all duration-300 bg-gray-50">
      <BotoesFluxo abrirSidebar={abrirSidebar} />

      <div className="flex items-center text-xl font-bold text-slate-600 my-6">
        <ChartSpline className="mr-3" />
        <p>Painel de Análises</p>
      </div>

      <CardsOverview dados={dados}/>

      <div className="grid grid-cols-2 gap-2 mt-3 justify-between">
        <GraficoFluxo dados={dados} />
        <ContasAPagar />
      </div>

      <div>
        <TabelaFluxo dados={dados} carregarDados={carregarDados}/>
      </div>

      {/* ✅ Sidebar de formulários agora passa a função de sucesso */}
      <SidebarForm
        isOpen={sidebarInfo.isOpen}
        tipo={sidebarInfo.tipo}
        onClose={fecharSidebar}
        onSuccess={handleCadastroSucesso} // Passando a nova função!
      />

      {/* ✅ Modal de sucesso agora vive aqui, controlado pelo MainContent */}
      <Modal
        isOpen={modalSucessoInfo.isOpen}
        onClose={fecharModalSucesso}
        tipo={modalSucessoInfo.tipo}
      />
    </main>
  );
}

export default MainContent;