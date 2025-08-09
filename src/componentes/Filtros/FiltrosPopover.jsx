function FiltroData({ onClose }) {
  return (
    <form className="flex flex-col gap-3 text-sm">
      <label>
        Início:
        <input type="date" className="border p-1 rounded w-full" />
      </label>
      <label>
        Fim:
        <input type="date" className="border p-1 rounded w-full" />
      </label>
      <button type="submit" className="bg-lime-600 text-white py-1 rounded mt-2 hover:bg-lime-700">
        Aplicar
      </button>
    </form>
  );
}

export default FiltroData;
