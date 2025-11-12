import HeatmapClient from './HeatmapClient';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Protocolo de Estratégia
          </h1>
          <p className="text-gray-600 mt-2">
            Analise o mapa tático e escolha suas 5 coordenadas com sabedoria
          </p>
        </header>

        <HeatmapClient />
      </div>
    </div>
  );
}