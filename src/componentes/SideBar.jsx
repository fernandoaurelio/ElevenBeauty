import { Home, Users, Settings } from 'lucide-react' // ou qualquer ícone SVG

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen group mt-20 z-30 ">
      <div className="h-full bg-gray-800 text-white flex flex-col transition-all duration-300 w-16 group-hover:w-48 overflow-hidden shadow-lg">

        {/* Menu */}
        <nav className="flex flex-col space-y-2 mt-4 px-2">
          <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
            <Home size={20} />
            <span className="hidden group-hover:block">Início</span>
          </a>

          <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
            <Users size={20} />
            <span className="hidden group-hover:block">Clientes</span>
          </a>

          <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
            <Settings size={20} />
            <span className="hidden group-hover:block">Configurações</span>
          </a>
        </nav>

      </div>
    </div>
  );
}

export default Sidebar;
