
import { useState,useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'

import NavBarHome from './componentes/navTopo'
import SideBarHome from './componentes/SideBar'
import MainContent from './componentes/MainContent'

import axios from 'axios'


function App() {
 

    // 1. O estado e a lógica de dados agora vivem aqui, no componente pai.
  const [dados, setDados] = useState([]);

  const carregarDados = async (filtro = {}) => {
    try {
      const res = await axios.get('http://localhost:3001/fluxo', {
        params: filtro,
      });
      setDados(res.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // 2. Busca os dados iniciais quando o App é montado.
  useEffect(() => {
    carregarDados();
  }, []); 
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBarHome />

      <div className="flex-1 flex flex-col" style={{ marginLeft: '4rem' }}>
        {/* Topbar */}
        <NavBarHome />

        {/* Conteúdo principal */}
        <main className="flex-1 mt-[64px] p-4 bg-gray-100 min-h-screen">
          <MainContent dados={dados} carregarDados={carregarDados}/>
          
        </main>
        
      </div>
    </div>
  )
}

export default App;
