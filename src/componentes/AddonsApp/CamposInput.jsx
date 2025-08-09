// components/CampoData.jsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

export default function CampoData({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs mb-1">{label}</label>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        locale="pt-BR"
        placeholderText={`Selecione a data`}
        className="w-full p-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring focus:border-blue-500"
        calendarClassName="!bg-white !border !border-gray-200 !rounded shadow-lg"
        popperClassName="z-50"
      />
    </div>
  );
}
