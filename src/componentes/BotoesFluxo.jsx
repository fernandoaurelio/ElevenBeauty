import { ArrowDownCircle, ArrowUpCircle, HandCoins,SlidersHorizontal  } from "lucide-react";

function BotoesFluxo({ abrirSidebar }) {
  const tipos = [
    {
      tipo: "Entrada",
      cor: "bg-green-600 hover:bg-green-700",
      icon: <ArrowDownCircle className="w-4 h-4 mr-2" />
    },
    {
      tipo: "Saída",
      cor: "bg-red-600 hover:bg-red-700",
      icon: <ArrowUpCircle className="w-4 h-4 mr-2" />
    },
    {
      tipo: "Vale",
      cor: "bg-yellow-500 hover:bg-yellow-600 text-black",
      icon: <HandCoins className="w-4 h-4 mr-2" />
    },
    {
      tipo: "Filtro",
      cor: "bg-slate-500 hover:bg-slate-600 text-black",
      icon: <SlidersHorizontal  className="w-4 h-4 mr-2" />
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-end">
      {tipos.map((item, index) => (
        <button
          key={index}
          onClick={() => abrirSidebar(item.tipo)}
          className={`cursor-pointer flex items-center px-6 py-2 text-sm font-semibold rounded shadow-sm ${item.cor} ${
            item.tipo === "Vale" ? "text-black" : "text-white"
          }`}
        >
          {item.icon}
          {item.tipo === "Filtro" ? "Filtro" : "Adicionar " + item.tipo}
          
        </button>
      ))}
    </div>
  );
}

export default BotoesFluxo;
