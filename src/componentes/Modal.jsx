import react from 'react';
import {useState, useEffect} from 'react';
import Lottie from 'lottie-react';
import Animacao from '../componentes/AddonsApp/sucessoAnimation.json';

function Modal ({ isOpen, onClose, tipo}) {

	// Esta linha foi mantida como no seu original, conforme solicitado.
	const[showModal, setShowModal] = useState(isOpen);

	if(!isOpen){
		return null;
	};

	// --- INÍCIO DAS ALTERAÇÕES ESSENCIAIS ---

	// 1. As variáveis são declaradas com 'let' ANTES do 'if'.
	let titulo;
	let corBotao;
	const animacao = Animacao; // Mantido como estava.

	// 2. A verificação usa 'else if' e checa a prop 'tipo' diretamente.
	if (tipo === "Entrada") {
		titulo = "Entrada Registrada com Sucesso";
		corBotao = "bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800";
	} else if (tipo === "Saída") { // Corrigido de 'elseif' e da lógica da condição.
		titulo = "Saída Registrada com Sucesso";
		corBotao = "bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800";
	} else {
		titulo = "Vale Registrado com Sucesso";
		corBotao = "bg-yellow-600 hover:bg-yellow-800 focus:ring-yellow-300 dark:focus:ring-yellow-800";
	}
	// O ponto e vírgula final do bloco if/else foi removido pois é desnecessário.

	// --- FIM DAS ALTERAÇÕES ESSENCIAIS ---


	return(
		// O restante do código JSX é exatamente o que você enviou.
		<div id="popup-modal" tabIndex="-1" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">

			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={onClose}>
						<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
						</svg>
					</button>

					<div className="p-4 md:p-5 text-center">
						<div className="w-48 h-48 mx-auto">
							<Lottie animationData={animacao} loop={false} />
						</div>

						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							{titulo}
						</h3>

						<button
							onClick={onClose}
							type="button"
							className={`text-white ${corBotao} font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
		);
}
export default Modal;