import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const enterApp = () => {
    navigate("/app", { state: { fromLanding: true } });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 p-4 text-center text-white">
      <h1 className="mb-4 text-4xl font-bold">Bem-vindo ao MChiodi Focus</h1>
      <p className="mb-2 max-w-xl">
        Sistema de gerenciamento de foco e produtividade para organizar suas
        tarefas.
      </p>
      <p className="mb-6 max-w-xl">
        Desenvolvido por Matheus Chiodi, apaixonado por tecnologia e
        desenvolvimento web.
      </p>
      <button
        onClick={enterApp}
        className="rounded bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
      >
        Entrar
      </button>
    </div>
  );
}
