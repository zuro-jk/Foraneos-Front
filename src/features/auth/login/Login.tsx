function Login() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          🍴
        </div>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Inicia sesión en <span className="text-red-600">Foráneos</span>
      </h2>

      {/* Formulario */}
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {/* Extra */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300"
            />
            Recuérdame
          </label>
          <a
            href="#"
            className="text-red-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Separador */}
      <div className="mt-6 text-center text-sm text-gray-500">
        ¿No tienes cuenta?{" "}
        <a
          href="/auth/signup"
          className="text-red-600 font-semibold hover:underline"
        >
          Regístrate
        </a>
      </div>
    </div>
  );
}

export default Login;
