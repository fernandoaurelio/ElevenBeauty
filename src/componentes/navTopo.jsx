function NavTopoMain() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-neutral-200 bg-opacity-25 shadow-md z-40">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* LOGO à esquerda */}
          <a href="#" className="text-xl font-bold text-gray-800">
            ElevenBeauty
          </a>

          {/* INPUT central */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Pesquise aqui"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          {/* USUÁRIO à direita */}
          <div className="p-2 rounded hover:shadow cursor-pointer">
            <div className="flex items-center">
              <img
                src="src/images/beyonceprofile.jpg"
                alt="Usuária"
                className="rounded-full mr-2"
                width="40"
                height="40"
              />
              <div className="hidden md:block text-start">
                <p className="text-sm font-semibold mb-0">Beyoncé Knowles</p>
                <small className="text-gray-600">Gestora</small>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavTopoMain;
